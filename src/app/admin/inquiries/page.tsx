import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getInquiries } from '@/lib/db';
import { Mail, Clock, User } from 'lucide-react';
import { MarkAsReadButton } from './MarkAsReadButton';
import { DeleteInquiryButton } from './DeleteInquiryButton';

export default async function InquiriesPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/admin/login');
  }

  const inquiries = getInquiries().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const statusConfig = {
    new: { label: 'New', class: 'bg-blue-500/20 text-blue-400' },
    read: { label: 'Read', class: 'bg-amber-500/20 text-amber-400' },
    replied: { label: 'Replied', class: 'bg-green-500/20 text-green-400' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Contact Inquiries</h1>
        <p className="text-gray-400 mt-1">{inquiries.length} total inquiries</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
          <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No inquiries yet</h3>
          <p className="text-gray-500">Contact form submissions will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`bg-gray-800/50 border rounded-xl p-6 transition-colors ${
                inquiry.status === 'new' ? 'border-blue-500/30' : 'border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    inquiry.status === 'new' ? 'bg-blue-500/20' : 'bg-gray-700'
                  }`}>
                    <User className={`w-5 h-5 ${inquiry.status === 'new' ? 'text-blue-400' : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{inquiry.name}</h3>
                    <p className="text-sm text-gray-500">{inquiry.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[inquiry.status as keyof typeof statusConfig].class}`}>
                  {statusConfig[inquiry.status as keyof typeof statusConfig].label}
                </span>
              </div>

              <h4 className="font-medium text-white mb-2">{inquiry.subject}</h4>
              <p className="text-gray-400 mb-4 whitespace-pre-wrap">{inquiry.message}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {new Date(inquiry.createdAt).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  {inquiry.status !== 'replied' && (
                    <MarkAsReadButton inquiryId={inquiry.id} currentStatus={inquiry.status} />
                  )}
                  <DeleteInquiryButton inquiryId={inquiry.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
