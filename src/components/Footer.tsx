"use client";

import Link from "next/link";
import Image from "next/image";
import { usePublicData } from "@/hooks/usePublicData";

const footerLinks = {
  services: [
    { label: "SEO Optimization", href: "/services" },
    { label: "Social Media", href: "/services" },
    { label: "PPC Advertising", href: "/services" },
    { label: "Content Marketing", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  const { data } = usePublicData();
  const companyInfo = data.company;
  
  const getValue = (key: string, fallback: string) => {
    const item = companyInfo.find(i => i.key === key);
    return item?.value || fallback;
  };

  const address = getValue("address", "Bhaktapur, Nepal");
  const phone = getValue("phone", "+977 9765564056");
  const email = getValue("email", "rohansakha343@gmail.com");
  const facebook = getValue("facebook", "https://www.facebook.com/profile.php?id=61583915586731");
  const instagram = getValue("instagram", "https://www.instagram.com/smartedgesolutions");
  const linkedin = getValue("linkedin", "https://www.linkedin.com/in/smart-edge-solutions-999");
  const twitter = getValue("twitter", "https://x.com/smartedge");

  const socialLinks = [
    { name: "X", href: twitter },
    { name: "in", href: linkedin },
    { name: "Ig", href: instagram },
    { name: "fb", href: facebook },
  ];

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo/smart_edge_logo-removebg-preview.png"
                alt="Smart Edge Solution"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-xl">
                Smart<span className="gradient-text">Edge</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Transforming brands through innovative digital marketing strategies. 
              Let&apos;s take your brand to the next level together.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">{address}</p>
              <p className="text-gray-400 text-sm">{phone}</p>
              <p className="text-gray-400 text-sm">{email}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Smart Edge Solution. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}