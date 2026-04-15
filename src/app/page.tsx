"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, Star
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { usePublicData } from "@/hooks/usePublicData";

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "150%", label: "Avg. Traffic Increase" },
  { value: "3.2x", label: "ROI Delivered" },
  { value: "98%", label: "Client Retention" },
];

export default function Home() {
  const { data } = usePublicData();
  const testimonials = data.testimonials.sort((a, b) => a.order - b.order).slice(0, 3);
  const homeServices = data.services.sort((a, b) => a.order - b.order).slice(0, 4);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1522071820671-60e19169f9ab?w=1200&h=800&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 z-10">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
              🚀 Trusted by 500+ businesses worldwide
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your <span className="gradient-text">Digital Presence</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              We craft data-driven marketing strategies that deliver real results. 
              From SEO to social media, we help your brand shine online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-bg text-white font-semibold hover:opacity-90 transition-all"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-amber-400 font-medium">What We Do</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">
              Comprehensive <span className="gradient-text">Digital Solutions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From SEO to web development, we offer end-to-end digital marketing services 
              tailored to your business goals.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServices.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl gradient-border hover:scale-105 transition-transform cursor-pointer h-full">
                  <div className="h-32 rounded-xl overflow-hidden mb-4">
                    <img 
                      src={`https://images.unsplash.com/photo-${i === 0 ? '1551288045-baffb6c0001f' : i === 1 ? '1611162616305-b69c3817a96c' : i === 2 ? '1579621970795-87deb9f1d03c' : '1551288045-baffb6c0001f'}?w=400&h=250&fit=crop`}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.shortDescription}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-amber-400 font-medium">Why Choose Us</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Results That <span className="gradient-text">Matter</span>
              </h2>
              <p className="text-gray-400 mb-8">
                We don&apos;t just promise results - we deliver them. Our data-driven approach 
                and transparent reporting ensure you always know the impact of your investment.
              </p>
              <div className="space-y-4">
                {[
                  "Data-driven strategies for measurable results",
                  "Transparent reporting and regular updates",
                  "Dedicated team with proven industry expertise",
                  "Custom solutions tailored to your business goals"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                <div className="aspect-video rounded-3xl gradient-border p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-df5be3f8a7a5?w=800&h=500&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full rounded-3xl object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-amber-400 font-medium">Testimonials</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <AnimatedSection key={testimonial.id} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    {testimonial.imageUrl ? (
                      <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <img 
                        src={`https://images.unsplash.com/photo-${i === 0 ? '1560250097-0b93528c311a' : i === 1 ? '1573496359142-b8d87734a5a2' : '1519085360753-af0119f7cbe7'}?w=100&h=100&fit=crop&crop=face`}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.message}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="p-12 rounded-3xl gradient-bg text-center glow">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Let&apos;s discuss how we can help your business grow. Book a free consultation today.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-amber-600 font-semibold hover:bg-white/90 transition-all"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}