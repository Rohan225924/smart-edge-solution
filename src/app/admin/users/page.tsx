import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUsers } from '@/lib/db';
import { Users, Shield, Edit } from 'lucide-react';
import { DeleteUserButton } from './DeleteUserButton';
import { CreateUserButton } from './CreateUserButton';

export default async function UsersPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/admin/login');
  }

  if (session.user.role !== 'admin') {
    redirect('/admin/dashboard');
  }

  const users = await getUsers();
  const currentUserId = session.user.id;

  const roleConfig = {
    admin: { label: 'Admin', class: 'bg-amber-500/20 text-amber-400', icon: Shield },
    editor: { label: 'Editor', class: 'bg-blue-500/20 text-blue-400' },
    viewer: { label: 'Viewer', class: 'bg-gray-500/20 text-gray-400' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">{users.length} total users</p>
        </div>
        <CreateUserButton />
      </div>

      {users.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No users yet</h3>
          <p className="text-gray-500">Create your first admin user to get started</p>
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Login</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Created</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <span className="text-amber-400 font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {user.name}
                          {user.id === currentUserId && (
                            <span className="ml-2 text-xs text-amber-400">(You)</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${roleConfig[user.role].class}`}>
                      {user.role === 'admin' && <Shield className="w-3 h-3" />}
                      {roleConfig[user.role].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {user.id !== currentUserId ? (
                        <>
                          <DeleteUserButton userId={user.id} userName={user.name} />
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Current User</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Role Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-white">Admin</span>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Full access to all features</li>
              <li>Manage users and roles</li>
              <li>Delete posts and inquiries</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Edit className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-white">Editor</span>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Create and edit blog posts</li>
              <li>View inquiries</li>
              <li>Cannot delete content</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-white">Viewer</span>
            </div>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>View dashboard</li>
              <li>Read-only access</li>
              <li>Cannot modify content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
