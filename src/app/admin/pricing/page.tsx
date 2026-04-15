"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, CheckCircle } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'pro';
  price: number;
  period: 'monthly' | 'yearly';
  description: string;
  features: string[];
  highlighted: boolean;
  order: number;
}

export default function PricingAdminPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Partial<PricingPlan> | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    tier: "basic" as "basic" | "standard" | "pro",
    price: 0,
    period: "monthly" as "monthly" | "yearly",
    description: "",
    features: "",
    highlighted: false,
    order: 0,
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await fetch("/api/admin/pricing");
      if (res.ok) {
        const data = await res.json();
        setPlans(data);
      }
    } catch (error) {
      console.error("Error loading pricing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentPlan({});
    setFormData({
      name: "",
      tier: "basic",
      price: 0,
      period: "monthly",
      description: "",
      features: "",
      highlighted: false,
      order: plans.length + 1,
    });
    setIsEditing(true);
  };

  const handleEdit = (plan: PricingPlan) => {
    setCurrentPlan(plan);
    setFormData({
      name: plan.name,
      tier: plan.tier,
      price: plan.price,
      period: plan.period,
      description: plan.description,
      features: plan.features.join(", "),
      highlighted: plan.highlighted,
      order: plan.order,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this pricing plan?")) {
      const res = await fetch(`/api/admin/pricing/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPlans(plans.filter((p) => p.id !== id));
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const planData = {
      ...formData,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
    };

    const endpoint = currentPlan?.id
      ? `/api/admin/pricing/${currentPlan.id}`
      : "/api/admin/pricing";

    const method = currentPlan?.id ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planData),
    });

    if (res.ok) {
      loadPlans();
      setIsEditing(false);
      setCurrentPlan(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Pricing Plans</h1>
          <p className="text-gray-400 mt-1">Manage your pricing plans</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Plan
        </button>
      </div>

      {isEditing && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {currentPlan?.id ? "Edit Plan" : "Add Plan"}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder="Basic"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value as "basic" | "standard" | "pro" })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="pro">Pro</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value as "monthly" | "yearly" })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                placeholder="Perfect for small businesses"
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="highlighted"
                checked={formData.highlighted}
                onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-amber-500 focus:ring-amber-500"
              />
              <label htmlFor="highlighted" className="text-sm text-gray-400">
                Highlight as Recommended
              </label>
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
                onClick={() => { setIsEditing(false); setCurrentPlan(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No pricing plans yet</p>
          </div>
        ) : (
          plans.sort((a, b) => a.order - b.order).map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border ${
                plan.highlighted
                  ? "bg-gradient-to-br from-amber-500/20 to-teal-500/20 border-amber-500/50"
                  : "bg-gray-800/50 border-gray-700"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.tier}</p>
                </div>
                {plan.highlighted && (
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400">
                    Recommended
                  </span>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400">/{plan.period}</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}