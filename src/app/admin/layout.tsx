"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Shield,
  UsersRound,
  Briefcase,
  MessageCircle,
  Building2,
  Info,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'About Page', href: '/admin/about', icon: Info },
  { name: 'Blog Posts', href: '/admin/posts', icon: FileText },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Team', href: '/admin/team', icon: UsersRound },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageCircle },
  { name: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { name: 'Company', href: '/admin/company', icon: Building2 },
  { name: 'Users', href: '/admin/users', icon: Users, adminOnly: true },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  const isAdmin = session?.user?.role === 'admin';

  const filteredNav = navigation.filter(item => !item.adminOnly || isAdmin);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-gray-300"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700 
        transform transition-transform duration-300 lg:translate-x-0 overflow-y-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full min-h-0">
          <div className="p-6 border-b border-gray-700">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-white">Smart Edge</span>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto pb-32">
            {filteredNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-amber-500/10 text-amber-400' 
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <div className="mb-4 px-4">
              <p className="font-medium text-white truncate">{session?.user?.name}</p>
              <p className="text-sm text-gray-400 truncate">{session?.user?.email}</p>
              <span className={`
                inline-block mt-1 px-2 py-0.5 text-xs rounded-full
                ${session?.user?.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-600/20 text-gray-400'}
              `}>
                {session?.user?.role}
              </span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:pl-64 min-h-screen pb-32">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
