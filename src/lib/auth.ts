import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, verifyPassword, updateLastLogin, initializeDefaultAdmin } from '@/lib/db';
import { UserRole } from '@/types';

declare module 'next-auth' {
  interface User {
    id: string;
    role: UserRole;
    name: string;
    email: string;
  }
  interface Session {
    user: {
      id: string;
      role: UserRole;
      name: string;
      email: string;
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await initializeDefaultAdmin();

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await getUserByEmail(email);
        
        if (!user) {
          return null;
        }

        const isValid = await verifyPassword(user, password);
        
        if (!isValid) {
          return null;
        }

        await updateLastLogin(user.id);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  trustHost: true,
});
