import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Settings, Bell, Shield, Palette } from 'lucide-react';

export default async function SettingsPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Settings className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Account Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <p className="text-white">{session.user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <p className="text-white">{session.user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
              <p className="text-amber-400 capitalize">{session.user.role}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Bell className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">Email notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">New inquiry alerts</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">Weekly summary</span>
              <input type="checkbox" className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500" />
            </label>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-left rounded-lg transition-colors">
              <span className="text-gray-300">Change password</span>
            </button>
            <button className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-left rounded-lg transition-colors">
              <span className="text-gray-300">Enable 2FA</span>
            </button>
            <button className="w-full px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-left rounded-lg transition-colors">
              <span className="text-gray-300">View login history</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Palette className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Theme</label>
              <select className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>Dark (Current)</option>
                <option>Light</option>
                <option>System</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
