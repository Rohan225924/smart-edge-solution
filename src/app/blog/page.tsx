import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "seo-trends-2026",
    title: "Top SEO Trends to Watch in 2026",
    excerpt: "Discover the latest SEO strategies that will dominate search rankings this year and how to stay ahead of the competition.",
    category: "SEO",
    date: "April 10, 2026",
    author: "Priya Patel",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afd2c04eb880?w=600&h=400&fit=crop"
  },
  {
    slug: "social-media-algorithm",
    title: "Mastering Social Media Algorithms",
    excerpt: "Learn how social media algorithms work and the strategies to maximize your organic reach across all platforms.",
    category: "Social Media",
    date: "April 5, 2026",
    author: "Jessica Chen",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"
  },
  {
    slug: "content-marketing-roi",
    title: "Measuring Content Marketing ROI",
    excerpt: "A comprehensive guide to tracking and measuring the return on investment of your content marketing efforts.",
    category: "Content",
    date: "March 28, 2026",
    author: "Marcus Johnson",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-df5be3f8a7a5?w=600&h=400&fit=crop"
  },
  {
    slug: "ppc-budgeting-guide",
    title: "The Ultimate PPC Budgeting Guide",
    excerpt: "Everything you need to know about allocating your PPC budget for maximum ROI and campaign success.",
    category: "PPC",
    date: "March 20, 2026",
    author: "Alex Rivera",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef3a9e2?w=600&h=400&fit=crop"
  },
  {
    slug: "email-marketing-automation",
    title: "Email Automation Best Practices",
    excerpt: "Set up effective email automation workflows that nurture leads and drive conversions without manual effort.",
    category: "Email",
    date: "March 15, 2026",
    author: "Jessica Chen",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
  },
  {
    slug: "local-seo-small-business",
    title: "Local SEO for Small Businesses",
    excerpt: "Practical tips to improve your local search visibility and attract more customers in your area.",
    category: "SEO",
    date: "March 8, 2026",
    author: "Priya Patel",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523961131990-5ea02c6d5083?w=600&h=400&fit=crop"
  },
];

const categories = ["All", "SEO", "Social Media", "Content", "PPC", "Email"];

export default function Blog() {
  return (
    <>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-amber-400 font-medium">Our Blog</span>
            <h1 className="text-5xl font-bold mt-2 mb-6">
              Insights & <span className="gradient-text">Updates</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Stay ahead of the curve with our latest marketing insights, 
              tips, and industry news.
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "All" 
                    ? "gradient-bg text-white" 
                    : "bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden gradient-border hover:scale-[1.02] transition-transform">
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 text-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-amber-400" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 text-sm group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="p-12 rounded-3xl gradient-bg text-center glow">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Never Miss an Update
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter and get the latest marketing insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-white text-amber-600 font-semibold hover:bg-white/90 transition-all"
              >
                Subscribe
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
