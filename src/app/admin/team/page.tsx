"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  order: number;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember> | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    imageUrl: "",
    order: 0,
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (error) {
      console.error("Error loading team:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentMember({});
    setFormData({ name: "", role: "", description: "", imageUrl: "", order: 0 });
    setIsEditing(true);
  };

  const handleEdit = (member: TeamMember) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      description: member.description,
      imageUrl: member.imageUrl || "",
      order: member.order,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers(members.filter((m) => m.id !== id));
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const endpoint = currentMember?.id 
      ? `/api/admin/team/${currentMember.id}` 
      : "/api/admin/team";
    
    const method = currentMember?.id ? "PUT" : "POST";
    
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      loadMembers();
      setIsEditing(false);
      setCurrentMember(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Members</h1>
          <p className="text-gray-400 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {isEditing && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {currentMember?.id ? "Edit Team Member" : "Add Team Member"}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Photo</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const uploadData = new FormData();
                      uploadData.append("file", file);
                      const res = await fetch("/api/admin/upload", {
                        method: "POST",
                        body: uploadData,
                      });
                      if (res.ok) {
                        const data = await res.json();
                        setFormData({ ...formData, imageUrl: data.url });
                      }
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600"
                />
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                )}
              </div>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full mt-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                placeholder="Or paste image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-32 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                type="button"
                onClick={() => { setIsEditing(false); setCurrentMember(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No team members yet</p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-amber-400 text-sm">{member.role}</p>
                  <p className="text-gray-400 text-sm mt-2">{member.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}