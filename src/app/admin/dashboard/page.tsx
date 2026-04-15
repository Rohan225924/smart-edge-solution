import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDashboardStats } from '@/lib/db';
import { Users, FileText, MessageSquare, TrendingUp, Edit, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/admin/login');
  }

  const stats = getDashboardStats();

  const statCards = [
    { name: 'Total Users', value: stats.totalUsers, icon: Users, color: 'amber' },
    { name: 'Blog Posts', value: stats.totalPosts, icon: FileText, color: 'teal' },
    { name: 'Published', value: stats.publishedPosts, icon: CheckCircle, color: 'green' },
    { name: 'New Inquiries', value: stats.newInquiries, icon: MessageSquare, color: 'blue' },
  ];

  const colorClasses = {
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, {session.user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className={`p-6 rounded-xl border ${colorClasses[stat.color as keyof typeof colorClasses]}`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8" />
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm opacity-80">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Edit className="w-5 h-5 text-amber-400" />
              <span className="text-gray-200">New Post</span>
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span className="text-gray-200">View Inquiries</span>
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FileText className="w-5 h-5 text-amber-400" />
              <span className="text-gray-200">All Posts</span>
            </Link>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span className="text-gray-200">Analytics</span>
            </Link>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-200">New blog post created</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-200">New contact inquiry</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-200">User logged in</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
