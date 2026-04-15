"use client";

import { useState, useEffect } from "react";
import { Save, Building2, Phone, Link2 } from "lucide-react";

interface CompanyInfoData {
  id: string;
  key: string;
  value: string;
  category: string;
}

const defaultInfo: CompanyInfoData[] = [
  { id: "1", key: "company_name", value: "Smart Edge Solution", category: "general" },
  { id: "2", key: "tagline", value: "Where Creativity Meets Technology", category: "general" },
  { id: "3", key: "address", value: "Bhaktapur, Nepal", category: "contact" },
  { id: "4", key: "phone", value: "+977 9765564056", category: "contact" },
  { id: "5", key: "email", value: "rohansakha343@gmail.com", category: "contact" },
  { id: "6", key: "facebook", value: "https://www.facebook.com/profile.php?id=61583915586731", category: "social" },
  { id: "7", key: "instagram", value: "https://www.instagram.com/smartedgesolutions", category: "social" },
  { id: "8", key: "linkedin", value: "https://www.linkedin.com/in/smart-edge-solutions-999", category: "social" },
  { id: "9", key: "twitter", value: "https://x.com/smartedge", category: "social" },
  { id: "10", key: "about", value: "Welcome to Smart Edge Solutions, where creativity meets technology to bring your visions to life.", category: "general" },
  { id: "11", key: "working_hours", value: "Monday - Friday: 9am - 6pm", category: "contact" },
];

export default function CompanyInfoPage() {
  const [info, setInfo] = useState<CompanyInfoData[]>(defaultInfo);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadInfo = async () => {
    try {
      const res = await fetch("/api/admin/company");
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          const merged = defaultInfo.map(defaultItem => {
            const saved = data.find((d: CompanyInfoData) => d.key === defaultItem.key);
            return saved || defaultItem;
          });
          setInfo(merged);
        }
      }
    } catch (error) {
      console.error("Error loading company info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const handleChange = (key: string, value: string) => {
    setInfo(info.map(item => item.key === key ? { ...item, value } : item));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const item of info) {
        await fetch("/api/admin/company", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: item.key, value: item.value, category: item.category }),
        });
      }
      alert("Company information saved successfully!");
    } catch (error) {
      console.error("Error saving company info:", error);
    } finally {
      setSaving(false);
    }
  };

  const contactInfo = info.filter(i => i.category === "contact");
  const socialInfo = info.filter(i => i.category === "social");
  const generalInfo = info.filter(i => i.category === "general");

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Company Information</h1>
          <p className="text-gray-400 mt-1">Manage your company details</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">General Info</h2>
          </div>
          <div className="space-y-4">
            {generalInfo.map((item) => (
              <div key={item.id}>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  {item.key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                </label>
                {item.key === "about" ? (
                  <textarea
                    value={item.value}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Contact Info</h2>
            </div>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.id}>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    {item.key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Link2 className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Social Links</h2>
            </div>
            <div className="space-y-4">
              {socialInfo.map((item) => (
                <div key={item.id}>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleChange(item.key, e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    placeholder={`https://${item.key}.com/...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}