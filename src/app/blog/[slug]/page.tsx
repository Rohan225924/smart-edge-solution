import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export default function BlogPost() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <Link href="/blog" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="mb-8">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm">
              SEO
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Top SEO Trends to Watch in 2026
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> Priya Patel
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> April 10, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> 5 min read
            </span>
          </div>

          <div className="h-64 rounded-2xl overflow-hidden mb-12">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afd2c04eb880?w=800&h=400&fit=crop"
              alt="SEO Trends"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed mb-6">
              The SEO landscape is constantly evolving, and staying ahead of the curve 
              is crucial for maintaining and improving your search rankings. In 2026, 
              we&apos;re seeing several key trends that are reshaping how businesses approach 
              search engine optimization.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. AI-Powered Search Understanding</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Search engines are getting smarter at understanding user intent and context. 
              This means traditional keyword optimization is no longer enough. You need to 
              create content that genuinely answers user questions and provides value.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Core Web Vitals remain critical</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Page speed, mobile responsiveness, and user experience metrics continue to be 
              important ranking factors. Sites that load quickly and provide smooth 
              experiences will outrank slower competitors.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Voice Search Optimization</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              With the rise of smart speakers and voice assistants, optimizing for 
              conversational queries is becoming essential. Focus on natural language 
              and question-based content.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The key to SEO success in 2026 is focusing on user experience, creating 
              valuable content, and staying adaptable to algorithm changes. Partner with 
              experts who understand these trends can give you the edge you need.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="font-semibold mb-4">Share this article</h3>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                <button
                  key={platform}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-colors"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
