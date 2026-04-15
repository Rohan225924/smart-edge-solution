"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  stats: { label: string; value: string }[];
  values: { title: string; description: string }[];
  ctaTitle: string;
  ctaText: string;
}

interface PageImage {
  heroImage: string;
  valuesImage: string;
}

export default function AboutAdminPage() {
  const [content, setContent] = useState<AboutContent>({
    heroTitle: "The Force Behind Your Growth",
    heroSubtitle: "We're more than a marketing agency - we're your strategic partners in building a powerful digital presence that drives real business results.",
    aboutText: "At Smart Edge Solutions, we believe in the power of creativity combined with data-driven strategies. Our team of experts works tirelessly to transform your digital presence and help your business reach new heights.",
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Clients Served", value: "500+" },
      { label: "Projects Completed", value: "50+" },
      { label: "Team Members", value: "10+" },
    ],
    values: [
      { title: "Results-Driven", description: "Every strategy is designed to deliver measurable outcomes" },
      { title: "Innovation", description: "We stay ahead of trends to give you a competitive edge" },
      { title: "Partnership", description: "Your success is our success - we're invested in your growth" },
      { title: "Excellence", description: "We never settle for 'good enough' - only the best" },
    ],
    ctaTitle: "Ready to Work Together?",
    ctaText: "Join hundreds of satisfied clients who've transformed their business with us.",
  });

  const [images, setImages] = useState<PageImage>({
    heroImage: "",
    valuesImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const res = await fetch("/api/public/data?type=about");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setContent(data);
        }
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, images }),
      });
      if (res.ok) {
        alert("Content saved successfully!");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (key: keyof PageImage, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setImages({ ...images, [key]: data.url });
      }
    }
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, stats: newStats });
  };

  const updateValue = (index: number, field: string, value: string) => {
    const newValues = [...content.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setContent({ ...content, values: newValues });
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">About Page Content</h1>
          <p className="text-gray-400 mt-1">Manage about page content and images</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={content.heroTitle}
              onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Subtitle</label>
            <input
              type="text"
              value={content.heroSubtitle}
              onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">About Text</label>
          <textarea
            value={content.aboutText}
            onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Hero Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload("heroImage", e)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600"
            />
            {images.heroImage && (
              <img src={images.heroImage} alt="Hero" className="w-24 h-24 rounded-lg object-cover" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Stats Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {content.stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Label {index + 1}</label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, "label", e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
              <label className="block text-sm font-medium text-gray-400">Value {index + 1}</label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(index, "value", e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">Our Values Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.values.map((value, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">Title {index + 1}</label>
              <input
                type="text"
                value={value.title}
                onChange={(e) => updateValue(index, "title", e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
              <label className="block text-sm font-medium text-gray-400">Description {index + 1}</label>
              <input
                type="text"
                value={value.description}
                onChange={(e) => updateValue(index, "description", e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Values Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload("valuesImage", e)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600"
            />
            {images.valuesImage && (
              <img src={images.valuesImage} alt="Values" className="w-24 h-24 rounded-lg object-cover" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white">CTA Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={content.ctaTitle}
              onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Text</label>
            <input
              type="text"
              value={content.ctaText}
              onChange={(e) => setContent({ ...content, ctaText: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}