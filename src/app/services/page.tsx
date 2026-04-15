"use client";

import Link from "next/link";
import { 
  TrendingUp, Megaphone, Target, BarChart3, 
  PenTool, Share2, Mail, Search, ArrowRight, CheckCircle, Code, Palette, Check 
} from "lucide-react";
import { usePublicData } from "@/hooks/usePublicData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Megaphone,
  Target,
  BarChart3,
  PenTool,
  Share2,
  Mail,
  Search,
  Code,
  Palette,
};

export default function Services() {
  const { data, loading } = usePublicData();
  const servicesData = (data.services || []).sort((a, b) => a.order - b.order);
  const pricingData = (data.pricing || []).sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 w-64 mx-auto bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-96 mx-auto bg-gray-700 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-medium">Our Services</span>
            <h1 className="text-5xl font-bold mt-2 mb-6">
              Digital Solutions That <span className="gradient-text">Drive Growth</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From SEO to web development, we offer comprehensive digital marketing services 
              tailored to your unique business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const IconComponent = iconMap[service.icon] || Search;
              return (
                <div key={service.id} className="group p-8 rounded-2xl gradient-border h-full hover:scale-[1.02] transition-transform">
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.shortDescription}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-amber-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {pricingData.length > 0 && (
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="text-amber-400 font-medium">Pricing</span>
                <h2 className="text-4xl font-bold mt-2 mb-4">
                  Choose Your <span className="gradient-text">Plan</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Flexible pricing plans to fit your business needs and budget
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {pricingData.map((plan) => (
                  <div key={plan.id} className={`relative p-8 rounded-2xl h-full ${
                    plan.highlighted 
                      ? "bg-gradient-to-br from-amber-500/20 to-teal-500/20 border-2 border-amber-500/50" 
                      : "gradient-border"
                  }`}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-amber-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href="/contact" 
                      className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                        plan.highlighted 
                          ? "gradient-bg text-white hover:opacity-90" 
                          : "border border-amber-500 text-amber-400 hover:bg-amber-500/10"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how our services can help you achieve your business goals.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started Today <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}