"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

export function DeleteUserButton({ userId, userName }: { userId: string; userName: string }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
      title={`Delete ${userName}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
