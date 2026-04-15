"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';

export function MarkAsReadButton({ inquiryId, currentStatus }: { inquiryId: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkAsRead = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: currentStatus === 'new' ? 'read' : 'replied' 
        }),
      });
      
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMarkAsRead}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
      {currentStatus === 'new' ? 'Mark Read' : 'Mark Replied'}
    </button>
  );
}
