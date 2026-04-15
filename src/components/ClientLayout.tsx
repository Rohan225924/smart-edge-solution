"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="blob w-96 h-96 bg-amber-500 top-0 left-0 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      <div className="blob w-80 h-80 bg-yellow-500 top-1/3 right-0 translate-x-1/2 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="blob w-72 h-72 bg-teal-500 bottom-1/4 left-1/4 animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}