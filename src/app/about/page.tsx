"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { Target, Award, Heart, Lightbulb, Users, Globe, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { usePublicData } from "@/hooks/usePublicData";

const defaultValues = [
  { icon: Target, title: "Results-Driven", desc: "Every strategy is designed to deliver measurable outcomes" },
  { icon: Lightbulb, title: "Innovation", desc: "We stay ahead of trends to give you a competitive edge" },
  { icon: Heart, title: "Partnership", desc: "Your success is our success - we're invested in your growth" },
  { icon: Award, title: "Excellence", desc: "We never settle for 'good enough' - only the best" },
];

const defaultStats = [
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Globe, value: "500+", label: "Clients Served" },
  { icon: Award, value: "50+", label: "Projects Completed" },
  { icon: Zap, value: "10+", label: "Team Members" },
];

export default function About() {
  const { data } = usePublicData();
  const teamMembers = data.team.sort((a, b) => a.order - b.order);
  const aboutContent = data.about;

  const heroTitle = aboutContent?.heroTitle || "The Force Behind Your Growth";
  const heroSubtitle = aboutContent?.heroSubtitle || "We're more than a marketing agency - we're your strategic partners in building a powerful digital presence that drives real business results.";
  const aboutText = aboutContent?.aboutText || "At Smart Edge Solutions, we believe in the power of creativity combined with data-driven strategies. Our team of experts works tirelessly to transform your digital presence and help your business reach new heights.";
  const ctaTitle = aboutContent?.ctaTitle || "Ready to Work Together?";
  const ctaText = aboutContent?.ctaText || "Join hundreds of satisfied clients who've transformed their business with us.";

  const stats = aboutContent?.stats || defaultStats;
  const statIcons = [Clock, Globe, Award, Zap];
type ValueItem = { title: string; description?: string; desc?: string; icon?: React.ElementType };

  const values: ValueItem[] = (aboutContent?.values || defaultValues).map((v: ValueItem, i) => ({ 
    ...v, 
    title: v.title || defaultValues[i]?.title,
    desc: v.description || v.desc,
    icon: v.icon || defaultValues[i]?.icon || Target,
  }));

  return (
    <>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-amber-400 font-medium">About Us</span>
            <h1 className="text-5xl font-bold mt-2 mb-6">
              {heroTitle.split(" ")[0]}{" "}
              <span className="gradient-text">{heroTitle.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">{heroSubtitle}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-square rounded-3xl gradient-border p-1">
                  {aboutContent?.images?.heroImage ? (
                    <img 
                      src={aboutContent.images.heroImage} 
                      alt="About Us" 
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-amber-900/50 to-teal-900/50 flex items-center justify-center">
                      <Users className="w-32 h-32 text-white/20" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl gradient-bg">
                  <p className="text-3xl font-bold text-white">{stats[0]?.value || "5+"}</p>
                  <p className="text-white/80 text-sm">{stats[0]?.label || "Years Experience"}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6">
                Crafting Digital <span className="gradient-text">Success Stories</span>
              </h2>
              <p className="text-gray-400 mb-6">{aboutText}</p>
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(1).map((stat, index) => {
                  const Icon = statIcons[index + 1] || Globe;
                  return (
                  <div key={index} className="p-4 rounded-xl bg-gray-800/50">
                    <Icon className="w-8 h-8 text-amber-400 mb-2" />
                    <p className="font-semibold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                )})}
              </div>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map((num) => (
              <AnimatedSection key={num} delay={num * 100}>
                <div className="aspect-video rounded-2xl overflow-hidden gradient-border">
                  <img 
                    src={`https://images.unsplash.com/photo-${num === 1 ? "1522071820671-60e19169f9ab" : num === 2 ? "1552664730-df5be3f8a7a5" : "1551434678-e076c223a692"}?w=600&h=400&fit=crop`}
                    alt={`Office ${num}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-gray-400 mt-2">The talented people behind our success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
            {teamMembers.map((member) => (
              <AnimatedSection key={member.id}>
                <div className="group p-6 rounded-2xl gradient-border hover:scale-105 transition-transform">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600">
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-amber-400 text-sm">{member.role}</p>
                    <p className="text-gray-500 text-xs mt-2">{member.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Our <span className="gradient-text">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="p-8 rounded-2xl gradient-border text-center hover:scale-105 transition-transform">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center">
                    {value.icon && <value.icon className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{"desc" in value ? value.desc : value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="p-12 rounded-3xl gradient-bg text-center glow">
            <h2 className="text-3xl font-bold mb-4 text-white">{ctaTitle}</h2>
            <p className="text-white/80 mb-6">{ctaText}</p>
            <Link href="/contact" className="inline-flex px-6 py-3 rounded-full bg-white text-amber-600 font-semibold hover:bg-white/90 transition-all">
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}