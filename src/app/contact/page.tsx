"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from "lucide-react";

const services = [
  "SEO Optimization",
  "Social Media Marketing",
  "PPC Advertising",
  "Content Marketing",
  "Brand Development",
  "Other"
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <span className="text-amber-400 font-medium">Contact Us</span>
            <h1 className="text-5xl font-bold mt-2 mb-6">
              Let&apos;s Start a <span className="gradient-text">Conversation</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Have a project in mind? We&apos;d love to hear about it. 
              Send us a message and we&apos;ll get back to you within 24 hours.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              {submitted ? (
                <div className="p-12 rounded-2xl gradient-border text-center h-full flex flex-col items-center justify-center">
                  <div className="p-4 rounded-full bg-amber-500/20 mb-6">
                    <CheckCircle className="w-12 h-12 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-gray-400">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Interested In</label>
                    <select
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-slate-900">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-slate-900">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 rounded-full gradient-bg text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl gradient-border">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl gradient-bg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Visit Us</h3>
                      <p className="text-gray-400">
                        Bhaktapur<br />
                        Nepal
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl gradient-border">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl gradient-bg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-gray-400">
                        +977 9765564056<br />
                        Mon-Fri, 9am-6pm NPT
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl gradient-border">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl gradient-bg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-gray-400">
                        rohansakha343@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl gradient-border">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl gradient-bg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-gray-400">
                        Monday - Friday: 9am - 6pm<br />
                        Saturday - Sunday: Available on call
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
