"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-sm">SF</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground">
            SpearFisher
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/cold-email"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/app"
            className="text-sm font-medium border border-border hover:border-border-light text-foreground px-4 py-2 rounded-lg transition-all hover:bg-surface-light"
          >
            Book a Demo
          </Link>
          <Link
            href="/app"
            className="text-sm font-medium btn-primary text-white px-4 py-2 rounded-lg"
          >
            Try Free
          </Link>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-200 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-4 bg-background/95 backdrop-blur-xl border-t border-border">
          <Link
            href="/cold-email"
            onClick={closeMenu}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Resources
          </Link>
          <Link
            href="/blog"
            onClick={closeMenu}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            onClick={closeMenu}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/app"
            onClick={closeMenu}
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Book a Demo
          </Link>
          <Link
            href="/app"
            onClick={closeMenu}
            className="text-sm font-medium btn-primary text-white px-4 py-2 rounded-lg text-center"
          >
            Try Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
