"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  imageUrl?: string;
  rating: number;
  order: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    imageUrl: "",
    rating: 5,
    order: 0,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentTestimonial({});
    setFormData({ name: "", role: "", company: "", message: "", imageUrl: "", rating: 5, order: 0 });
    setIsEditing(true);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      message: testimonial.message,
      imageUrl: testimonial.imageUrl || "",
      rating: testimonial.rating,
      order: testimonial.order,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const endpoint = currentTestimonial?.id 
      ? `/api/admin/testimonials/${currentTestimonial.id}` 
      : "/api/admin/testimonials";
    
    const method = currentTestimonial?.id ? "PUT" : "POST";
    
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      loadTestimonials();
      setIsEditing(false);
      setCurrentTestimonial(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Testimonials</h1>
          <p className="text-gray-400 mt-1">Manage customer testimonials</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {isEditing && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {currentTestimonial?.id ? "Edit Testimonial" : "Add Testimonial"}
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
                <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Role/Title</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                >
                  {[1,2,3,4,5].map(n => (
                    <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                required
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
                      const formDataUpload = new FormData();
                      formDataUpload.append("file", file);
                      const res = await fetch("/api/admin/upload", {
                        method: "POST",
                        body: formDataUpload,
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
                onClick={() => { setIsEditing(false); setCurrentTestimonial(null); }}
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
        {testimonials.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No testimonials yet</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-3">&quot;{testimonial.message}&quot;</p>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
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