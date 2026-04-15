import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUsers, createUser, getUserByEmail } from '@/lib/db';

export async function GET() {
  const session = await auth();
  
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const user = await createUser({ name, email, password, role: role || 'viewer' });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
