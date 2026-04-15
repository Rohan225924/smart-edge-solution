export type UserRole = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: string;
  authorName: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  publishedPosts: number;
  newInquiries: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  imageUrl?: string;
  rating: number;
  order: number;
  createdAt: string;
}

export interface CompanyInfo {
  id: string;
  key: string;
  value: string;
  category: 'contact' | 'social' | 'general';
}

export interface PricingPlan {
  id: string;
  name: string;
  tier: 'basic' | 'standard' | 'pro';
  price: number;
  period: 'monthly' | 'yearly';
  description: string;
  features: string[];
  highlighted: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
