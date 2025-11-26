"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { UniformSlot, registerUniformComponent } from "@uniformdev/canvas-react"
import { cn } from "@/lib/utils"

export interface HeaderProps {
  className?: string;
  cartCount?: number;
  searchPlaceholder?: string;
  logoText?: string;
}

/**
 * Header Component - E-commerce Navigation Header
 *
 * A modern, responsive header component with:
 * - Editable navigation links via Uniform
 * - Mobile menu using Sheet component
 * - Search functionality
 * - Shopping cart with count badge
 * - User account icon
 * - Sticky positioning with backdrop blur
 *
 * Features:
 * - Responsive design (mobile sheet menu, desktop horizontal nav)
 * - Search bar toggle
 * - Cart count badge
 * - Editable navigation items via UniformSlot
 * - Highlight badges for featured links
 */
export function Header({
  className = "",
  cartCount = 0,
  searchPlaceholder = "Search for sofas, chairs, tables...",
  logoText = "Arinn",
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className={cn("sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu */}
            <div className="flex lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-background">
                  <nav className="mt-8 flex flex-col gap-4 mobile-navigation-context">
                    <UniformSlot name="navigationLinks" />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                {logoText || "Arinn"}
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex lg:gap-8">
              <UniformSlot name="navigationLinks" />
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {(cartCount ?? 0) > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {cartCount ?? 0}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="border-t border-border py-4 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "header",
  component: Header,
});

export default Header;
