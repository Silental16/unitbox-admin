"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Cases", href: "#cases" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#f5f5f7] font-[family-name:var(--font-inter)]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-[60px] lg:px-[120px]">
        <a href="/">
          <Image
            src="/landing/logo.png"
            alt="Unitbox"
            width={119}
            height={24}
            priority
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium leading-none text-black/55 transition-opacity hover:text-black/80"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#demo"
          className="hidden rounded-full px-4 py-3 text-[14px] font-medium text-white md:block"
          style={{
            background:
              "linear-gradient(122deg, #212529 8.3%, #566a65 250.5%)",
          }}
        >
          Get Demo
        </a>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Menu className="h-6 w-6 text-black/70" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-[#f5f5f7]">
              <div className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[16px] font-medium text-black/55 transition-opacity hover:text-black/80"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#demo"
                  className="mt-4 inline-block rounded-full px-4 py-3 text-center text-[14px] font-medium text-white"
                  style={{
                    background:
                      "linear-gradient(122deg, #212529 8.3%, #566a65 250.5%)",
                  }}
                >
                  Get Demo
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
