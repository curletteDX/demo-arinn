import React from "react";
import Link from "next/link";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface FooterProps {
  className?: string;
  /** Brand tagline/description */
  tagline?: string;
  /** Newsletter description */
  newsletterDescription?: string;
  /** Newsletter placeholder text */
  newsletterPlaceholder?: string;
  /** Subscribe button text */
  subscribeButtonText?: string;
  /** Copyright text */
  copyrightText?: string;
  /** Privacy Policy link text */
  privacyLinkText?: string;
  /** Terms of Service link text */
  termsLinkText?: string;
  /** Privacy Policy link */
  privacyLink?: {
    type: string;
    path?: string;
    url?: string;
  };
  /** Terms of Service link */
  termsLink?: {
    type: string;
    path?: string;
    url?: string;
  };
}

/**
 * Footer Component - Website Footer with Newsletter and Link Groups
 *
 * A comprehensive footer component featuring:
 * - Brand section with newsletter signup
 * - Multiple link groups (Shop, Company, Support)
 * - Copyright and legal links
 *
 * Features:
 * - Newsletter subscription form with editable placeholder
 * - Organized link groups via slots
 * - Dark background with light text
 * - Responsive grid layout (1 col mobile, 4 cols desktop)
 * - All text editable via Uniform
 *
 * Design Notes:
 * - Uses foreground color for background (dark theme)
 * - Serif font for brand name "Arinn"
 * - Clean, organized layout
 * - Generous padding for breathing room
 * - Italic tagline for brand story
 *
 * Slots:
 * - `linkGroups`: Add FooterLinkGroup components here (Shop, Company, Support)
 */
function Footer({ className = "", privacyLink, termsLink }: FooterProps) {
  const privacyHref = privacyLink?.path || privacyLink?.url || "/privacy";
  const termsHref = termsLink?.path || termsLink?.url || "/terms";

  return (
    <footer className={cn("bg-foreground text-background", className)}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-bold tracking-tight mb-2">
              Arinn
            </h3>
            <p className="text-xs text-background/50 italic mb-3">
              <UniformText
                parameterId="tagline"
                placeholder='From the Old Norse word for "hearth"'
                as="span"
              />
            </p>
            <p className="text-sm text-background/70 mb-4">
              <UniformText
                parameterId="newsletterDescription"
                placeholder="Join our gathering. Get early access to new collections, styling inspiration, and member-only offers delivered to your hearth."
                as="span"
              />
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="secondary" className="shrink-0">
                <UniformText
                  parameterId="subscribeButtonText"
                  placeholder="Subscribe"
                  as="span"
                />
              </Button>
            </div>
          </div>

          {/* Link Groups */}
          <UniformSlot name="linkGroups" />
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              <UniformText
                parameterId="copyrightText"
                placeholder="© 2025 Arinn. All rights reserved."
                as="span"
              />
            </p>
            <div className="flex gap-6">
              <Link href={privacyHref} className="text-sm text-background/60 hover:text-background">
                <UniformText
                  parameterId="privacyLinkText"
                  placeholder="Privacy Policy"
                  as="span"
                />
              </Link>
              <Link href={termsHref} className="text-sm text-background/60 hover:text-background">
                <UniformText
                  parameterId="termsLinkText"
                  placeholder="Terms of Service"
                  as="span"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// UNIFORM REGISTRATION: Makes this component available as a footer
// Used in the Page component's footer slot
registerUniformComponent({
  type: "footer",
  component: Footer,
});

export default Footer;
