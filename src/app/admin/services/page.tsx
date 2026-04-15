"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  imageUrl?: string;
  features: string[];
  order: number;
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    icon: "",
    imageUrl: "",
    features: "",
    order: 0,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleAdd = () => {
    setCurrentService({});
    setFormData({ title: "", slug: "", shortDescription: "", fullDescription: "", icon: "", imageUrl: "", features: "", order: 0 });
    setIsEditing(true);
  };

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      icon: service.icon,
      imageUrl: service.imageUrl || "",
      features: service.features.join(", "),
      order: service.order,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== id));
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const featuresArray = formData.features.split(",").map(f => f.trim()).filter(f => f);
    
    const data = {
      ...formData,
      features: featuresArray,
    };
    
    const endpoint = currentService?.id 
      ? `/api/admin/services/${currentService.id}` 
      : "/api/admin/services";
    
    const method = currentService?.id ? "PUT" : "POST";
    
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      loadServices();
      setIsEditing(false);
      setCurrentService(null);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData({ 
      ...formData, 
      title, 
      slug: currentService?.id ? formData.slug : generateSlug(title) 
    });
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Services</h1>
          <p className="text-gray-400 mt-1">Manage your services</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {isEditing && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {currentService?.id ? "Edit Service" : "Add Service"}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Short Description</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Description</label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Icon (Lucide icon name)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                placeholder="TrendingUp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Service Image</label>
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
              <label className="block text-sm font-medium text-gray-400 mb-1">Features (comma separated)</label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                placeholder="Feature 1, Feature 2, Feature 3"
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
                onClick={() => { setIsEditing(false); setCurrentService(null); }}
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
        {services.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No services yet</p>
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{service.shortDescription}</p>
                  <p className="text-amber-400 text-xs mt-2">Order: {service.order}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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