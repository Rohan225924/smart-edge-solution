import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getPosts } from '@/lib/db';
import { Plus, Edit, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import { DeletePostButton } from './DeletePostButton';

export default async function PostsPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/admin/login');
  }

  const posts = getPosts();
  const canEdit = session.user.role === 'admin' || session.user.role === 'editor';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">{posts.length} total posts</p>
        </div>
        {canEdit && (
          <Link
            href="/admin/posts/new"
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-6">Create your first blog post to get started</p>
          {canEdit && (
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Created</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{post.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">{post.excerpt}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-block px-2 py-1 text-xs font-medium rounded-full
                      ${post.status === 'published' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-600/20 text-gray-400'}
                    `}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{post.authorName}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.status === 'published' && (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      {canEdit && (
                        <>
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="p-2 text-gray-400 hover:text-amber-400 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <DeletePostButton postId={post.id} />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
