import { User, BlogPost, ContactInquiry, TeamMember, Service, Testimonial, CompanyInfo, PricingPlan } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

interface DataCache {
  users: User[] | null;
  posts: BlogPost[] | null;
  inquiries: ContactInquiry[] | null;
  lastFetch: number;
}

const cache: DataCache = {
  users: null,
  posts: null,
  inquiries: null,
  lastFetch: 0,
};

const CACHE_TTL = 5000;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, defaultValue: T): T {
  ensureDataDir();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJsonFile<T>(filePath: string, data: T): void {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function getUsers(): Promise<User[]> {
  if (cache.users && Date.now() - cache.lastFetch < CACHE_TTL) {
    return cache.users.map(u => ({ ...u, password: '' }));
  }
  const users = readJsonFile<User[]>(USERS_FILE, []);
  cache.users = users;
  cache.lastFetch = Date.now();
  return users.map(u => ({ ...u, password: '' }));
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  const user = users.find(u => u.id === id);
  if (user) {
    return { ...user, password: '' };
  }
  return null;
}

export async function createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  const hashedPassword = await bcrypt.hash(data.password, 12);
  
  const newUser: User = {
    ...data,
    id: uuidv4(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  writeJsonFile(USERS_FILE, users);
  cache.users = users;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = newUser;
  return userWithoutPassword as User;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User | null> {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) return null;
  
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 12);
  }
  
  users[index] = { ...users[index], ...data };
  writeJsonFile(USERS_FILE, users);
  cache.users = users;
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = users[index];
  return userWithoutPassword as User;
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  const filtered = users.filter(u => u.id !== id);
  
  if (filtered.length === users.length) return false;
  
  writeJsonFile(USERS_FILE, filtered);
  cache.users = filtered;
  return true;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}

export async function updateLastLogin(userId: string): Promise<void> {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  const index = users.findIndex(u => u.id === userId);
  
  if (index !== -1) {
    users[index].lastLogin = new Date().toISOString();
    writeJsonFile(USERS_FILE, users);
    cache.users = users;
  }
}

export async function initializeDefaultAdmin(): Promise<void> {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  
  if (users.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin: User = {
      id: uuidv4(),
      email: 'admin@smartedge.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    writeJsonFile(USERS_FILE, [admin]);
  }
}

export function getPosts(): BlogPost[] {
  if (cache.posts && Date.now() - cache.lastFetch < CACHE_TTL) {
    return cache.posts;
  }
  const posts = readJsonFile<BlogPost[]>(POSTS_FILE, []);
  cache.posts = posts;
  return posts;
}

export function getPostById(id: string): BlogPost | null {
  const posts = getPosts();
  return posts.find(p => p.id === id) || null;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getPosts();
  return posts.find(p => p.slug === slug) || null;
}

export function createPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost {
  const posts = getPosts();
  
  const newPost: BlogPost = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  posts.push(newPost);
  writeJsonFile(POSTS_FILE, posts);
  cache.posts = posts;
  
  return newPost;
}

export function updatePost(id: string, data: Partial<BlogPost>): BlogPost | null {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...data, updatedAt: new Date().toISOString() };
  writeJsonFile(POSTS_FILE, posts);
  cache.posts = posts;
  
  return posts[index];
}

export function deletePost(id: string): boolean {
  const posts = getPosts();
  const filtered = posts.filter(p => p.id !== id);
  
  if (filtered.length === posts.length) return false;
  
  writeJsonFile(POSTS_FILE, filtered);
  cache.posts = filtered;
  return true;
}

export function getInquiries(): ContactInquiry[] {
  if (cache.inquiries && Date.now() - cache.lastFetch < CACHE_TTL) {
    return cache.inquiries;
  }
  const inquiries = readJsonFile<ContactInquiry[]>(INQUIRIES_FILE, []);
  cache.inquiries = inquiries;
  return inquiries;
}

export function getInquiryById(id: string): ContactInquiry | null {
  const inquiries = getInquiries();
  return inquiries.find(i => i.id === id) || null;
}

export function createInquiry(data: Omit<ContactInquiry, 'id' | 'createdAt'>): ContactInquiry {
  const inquiries = getInquiries();
  
  const newInquiry: ContactInquiry = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  
  inquiries.push(newInquiry);
  writeJsonFile(INQUIRIES_FILE, inquiries);
  cache.inquiries = inquiries;
  
  return newInquiry;
}

export function updateInquiry(id: string, data: Partial<ContactInquiry>): ContactInquiry | null {
  const inquiries = getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  
  if (index === -1) return null;
  
  inquiries[index] = { ...inquiries[index], ...data };
  writeJsonFile(INQUIRIES_FILE, inquiries);
  cache.inquiries = inquiries;
  
  return inquiries[index];
}

export function deleteInquiry(id: string): boolean {
  const inquiries = getInquiries();
  const filtered = inquiries.filter(i => i.id !== id);
  
  if (filtered.length === inquiries.length) return false;
  
  writeJsonFile(INQUIRIES_FILE, filtered);
  cache.inquiries = filtered;
  return true;
}

export function getDashboardStats() {
  const users = readJsonFile<User[]>(USERS_FILE, []);
  const posts = getPosts();
  const inquiries = getInquiries();
  
  return {
    totalUsers: users.length,
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === 'published').length,
    newInquiries: inquiries.filter(i => i.status === 'new').length,
  };
}

const TEAM_FILE = path.join(DATA_DIR, 'team.json');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');
const COMPANY_FILE = path.join(DATA_DIR, 'company.json');
const PRICING_FILE = path.join(DATA_DIR, 'pricing.json');

export function getTeamMembers(): TeamMember[] {
  return readJsonFile<TeamMember[]>(TEAM_FILE, []);
}

export function getTeamMemberById(id: string): TeamMember | null {
  const members = getTeamMembers();
  return members.find(m => m.id === id) || null;
}

export function createTeamMember(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): TeamMember {
  const members = getTeamMembers();
  const newMember: TeamMember = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  members.push(newMember);
  writeJsonFile(TEAM_FILE, members);
  return newMember;
}

export function updateTeamMember(id: string, data: Partial<TeamMember>): TeamMember | null {
  const members = getTeamMembers();
  const index = members.findIndex(m => m.id === id);
  if (index === -1) return null;
  members[index] = { ...members[index], ...data, updatedAt: new Date().toISOString() };
  writeJsonFile(TEAM_FILE, members);
  return members[index];
}

export function deleteTeamMember(id: string): boolean {
  const members = getTeamMembers();
  const filtered = members.filter(m => m.id !== id);
  if (filtered.length === members.length) return false;
  writeJsonFile(TEAM_FILE, filtered);
  return true;
}

export function getServices(): Service[] {
  return readJsonFile<Service[]>(SERVICES_FILE, []);
}

export function getServiceById(id: string): Service | null {
  const services = getServices();
  return services.find(s => s.id === id) || null;
}

export function getServiceBySlug(slug: string): Service | null {
  const services = getServices();
  return services.find(s => s.slug === slug) || null;
}

export function createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Service {
  const services = getServices();
  const newService: Service = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  services.push(newService);
  writeJsonFile(SERVICES_FILE, services);
  return newService;
}

export function updateService(id: string, data: Partial<Service>): Service | null {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return null;
  services[index] = { ...services[index], ...data, updatedAt: new Date().toISOString() };
  writeJsonFile(SERVICES_FILE, services);
  return services[index];
}

export function deleteService(id: string): boolean {
  const services = getServices();
  const filtered = services.filter(s => s.id !== id);
  if (filtered.length === services.length) return false;
  writeJsonFile(SERVICES_FILE, filtered);
  return true;
}

export function getTestimonials(): Testimonial[] {
  return readJsonFile<Testimonial[]>(TESTIMONIALS_FILE, []);
}

export function getTestimonialById(id: string): Testimonial | null {
  const testimonials = getTestimonials();
  return testimonials.find(t => t.id === id) || null;
}

export function createTestimonial(data: Omit<Testimonial, 'id' | 'createdAt'>): Testimonial {
  const testimonials = getTestimonials();
  const newTestimonial: Testimonial = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  testimonials.push(newTestimonial);
  writeJsonFile(TESTIMONIALS_FILE, testimonials);
  return newTestimonial;
}

export function updateTestimonial(id: string, data: Partial<Testimonial>): Testimonial | null {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index === -1) return null;
  testimonials[index] = { ...testimonials[index], ...data };
  writeJsonFile(TESTIMONIALS_FILE, testimonials);
  return testimonials[index];
}

export function deleteTestimonial(id: string): boolean {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  if (filtered.length === testimonials.length) return false;
  writeJsonFile(TESTIMONIALS_FILE, filtered);
  return true;
}

export function getCompanyInfo(): CompanyInfo[] {
  return readJsonFile<CompanyInfo[]>(COMPANY_FILE, []);
}

export function getCompanyInfoByKey(key: string): CompanyInfo | null {
  const info = getCompanyInfo();
  return info.find(i => i.key === key) || null;
}

export function updateCompanyInfo(key: string, value: string): CompanyInfo {
  const info = getCompanyInfo();
  const index = info.findIndex(i => i.key === key);
  if (index !== -1) {
    info[index].value = value;
    writeJsonFile(COMPANY_FILE, info);
    return info[index];
  }
  const newInfo: CompanyInfo = { id: uuidv4(), key, value, category: 'general' };
  info.push(newInfo);
  writeJsonFile(COMPANY_FILE, info);
  return newInfo;
}

export function getPricingPlans(): PricingPlan[] {
  return readJsonFile<PricingPlan[]>(PRICING_FILE, [
    {
      id: 'pricing-1',
      name: 'Basic',
      tier: 'basic',
      price: 49,
      period: 'monthly',
      description: 'Perfect for small businesses just getting started',
      features: [
        'Social Media Management',
        '5 Posts Per Month',
        'Basic Analytics',
        'Email Support'
      ],
      highlighted: false,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'pricing-2',
      name: 'Standard',
      tier: 'standard',
      price: 99,
      period: 'monthly',
      description: 'Great for growing businesses',
      features: [
        'Everything in Basic',
        '15 Posts Per Month',
        'Advanced Analytics',
        'PPC Management',
        'Priority Support'
      ],
      highlighted: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'pricing-3',
      name: 'Pro',
      tier: 'pro',
      price: 199,
      period: 'monthly',
      description: 'Ultimate solution for scaling businesses',
      features: [
        'Everything in Standard',
        'Unlimited Posts',
        'Full SEO Suite',
        'Custom Content Creation',
        'Dedicated Account Manager',
        '24/7 Phone Support'
      ],
      highlighted: false,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
}

export function getPricingPlanById(id: string): PricingPlan | null {
  const plans = getPricingPlans();
  return plans.find(p => p.id === id) || null;
}

export function createPricingPlan(data: Omit<PricingPlan, 'id' | 'createdAt' | 'updatedAt'>): PricingPlan {
  const plans = getPricingPlans();
  const newPlan: PricingPlan = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  plans.push(newPlan);
  writeJsonFile(PRICING_FILE, plans);
  return newPlan;
}

export function updatePricingPlan(id: string, data: Partial<PricingPlan>): PricingPlan | null {
  const plans = getPricingPlans();
  const index = plans.findIndex(p => p.id === id);
  if (index === -1) return null;
  plans[index] = { ...plans[index], ...data, updatedAt: new Date().toISOString() };
  writeJsonFile(PRICING_FILE, plans);
  return plans[index];
}

export function deletePricingPlan(id: string): boolean {
  const plans = getPricingPlans();
  const filtered = plans.filter(p => p.id !== id);
  if (filtered.length === plans.length) return false;
  writeJsonFile(PRICING_FILE, filtered);
  return true;
}
