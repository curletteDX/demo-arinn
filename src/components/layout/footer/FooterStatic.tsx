import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FooterStaticProps {
  className?: string;
}

/**
 * FooterStatic - Static version of the website footer
 *
 * A standalone footer component that works without Uniform context.
 * Perfect for static pages like product detail pages.
 *
 * Features:
 * - Newsletter signup
 * - Navigation link groups
 * - Copyright and legal links
 */
function FooterStatic({ className = "" }: FooterStaticProps) {
  const shopLinks = [
    { href: "/sofas", label: "Sofas" },
    { href: "/chairs", label: "Chairs" },
    { href: "/tables", label: "Tables" },
    { href: "/storage", label: "Storage" },
    { href: "/bedroom", label: "Bedroom" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
  ];

  const supportLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/warranty", label: "Warranty" },
  ];

  return (
    <footer className={cn("bg-gray-900 text-white", className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold tracking-tight mb-2">
              Arinn
            </h3>
            <p className="text-xs text-gray-500 italic mb-3">
              From the Old Norse word for &quot;hearth&quot;
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Join our gathering. Get early access to new collections, styling
              inspiration, and member-only offers delivered to your hearth.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="shrink-0 bg-[#8B7355] hover:bg-[#7A6548] text-white">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Arinn. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterStatic;
