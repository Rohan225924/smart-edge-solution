"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
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
          className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="p-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
