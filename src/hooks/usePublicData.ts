"use client";

import { useState, useEffect, useCallback } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  order: number;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  order: number;
}

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

interface CompanyInfo {
  id: string;
  key: string;
  value: string;
  category: string;
}

interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  stats: { label: string; value: string }[];
  values: { title: string; description: string }[];
  ctaTitle: string;
  ctaText: string;
  images?: {
    heroImage?: string;
    valuesImage?: string;
  };
}

interface PricingPlan {
  id: string;
  name: string;
  tier: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  order: number;
}

interface PublicData {
  team: TeamMember[];
  services: Service[];
  testimonials: Testimonial[];
  company: CompanyInfo[];
  about?: AboutContent | null;
  pricing?: PricingPlan[];
}

const defaultData: PublicData = {
  team: [],
  services: [],
  testimonials: [],
  company: [
    { id: "1", key: "company_name", value: "Smart Edge Solution", category: "general" },
    { id: "3", key: "address", value: "Bhaktapur, Nepal", category: "contact" },
    { id: "4", key: "phone", value: "+977 9765564056", category: "contact" },
    { id: "5", key: "email", value: "rohansakha343@gmail.com", category: "contact" },
    { id: "6", key: "facebook", value: "https://www.facebook.com/profile.php?id=61583915586731", category: "social" },
    { id: "9", key: "twitter", value: "https://x.com/smartedge", category: "social" },
  ],
  about: null,
  pricing: [],
};

export function usePublicData() {
  const [data, setData] = useState<PublicData>(defaultData);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/public/data');
      if (res.ok) {
        const json = await res.json();
        setData({
          team: json.team || defaultData.team,
          services: json.services || defaultData.services,
          testimonials: json.testimonials || defaultData.testimonials,
          company: json.company || defaultData.company,
          about: json.about || defaultData.about,
          pricing: json.pricing || defaultData.pricing,
        });
      }
    } catch (err) {
      console.error('Error fetching public data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}

export function getLocalData(): PublicData {
  return defaultData;
}