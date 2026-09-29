'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Shield, Radio, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top Industrial Strip */}
      <div className="hidden md:block bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/60 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Fabrication Unit: IDA Mallapur & Gouthami Nagar Industrial Area, Hyderabad
            </span>
            <span className="text-slate-500">|</span>
            <span>Chief Engineer: S.C. Sharma</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+919951354848"
              className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-300"
            >
              <Phone className="w-3 h-3 text-amber-400" /> +91 99513 54848
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="mailto:scsharma@sunshadeindia.com"
              className="hover:text-amber-400 transition-colors text-slate-300"
            >
              scsharma@sunshadeindia.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              {/* Tensile structure iconic geometry glyph */}
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-amber-400 fill-none stroke-current stroke-2 group-hover:scale-110 transition-transform"
              >
                <path d="M3 19L12 4L21 19Z" strokeLinejoin="round" />
                <path d="M12 4V19" strokeDasharray="2 2" />
                <path d="M7.5 11.5L16.5 11.5" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-['Outfit'] leading-none">
              SUNSHADE<span className="text-amber-400">.</span>SOLUTIONS
            </span>
            <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-1">
              Industrial Tensile Structures • Hyderabad
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#products" className="hover:text-amber-400 transition-colors">
            Product Catalog
          </Link>
          <Link href="#calculator" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Cost Estimator
          </Link>
          <Link href="#credentials" className="hover:text-amber-400 transition-colors">
            Factory & Credentials
          </Link>
          <Link href="#contact" className="hover:text-amber-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Live Button */}
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white hover:border-amber-500/50 hover:bg-slate-800 transition-all"
            title="Real-Time Admin Lead Dashboard"
          >
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Admin Live</span>
          </Link>

          {/* WhatsApp Action */}
          <a
            href="https://wa.me/919951354848?text=Hello%20Sunshade%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20a%20tensile%20structure%20project%20in%20Hyderabad."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/20 text-xs font-semibold transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Instant Quote CTA */}
          <Link
            href="#calculator"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide uppercase shadow-lg shadow-amber-500/25 transition-all"
          >
            <span>Instant Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Admin
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-slate-200">
            <Link
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Product Catalog
            </Link>
            <Link
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400 flex items-center justify-between"
            >
              <span>Cost Estimator</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Live</span>
            </Link>
            <Link
              href="#credentials"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Factory Credentials & Google Maps
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-amber-400"
            >
              Contact Engineering Team
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-emerald-400 flex items-center gap-2"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Real-Time Admin Dashboard
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <a
              href="tel:+919951354848"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call +91 99513 54848
            </a>
            <a
              href="https://wa.me/919951354848?text=Hello%20Sunshade%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20a%20tensile%20structure%20project%20in%20Hyderabad."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Direct WhatsApp Inquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
