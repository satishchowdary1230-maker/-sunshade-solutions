'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCatalog from '@/components/ProductCatalog';
import CostEstimator from '@/components/CostEstimator';
import CompanyCredentials from '@/components/CompanyCredentials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { Phone, MessageCircle } from 'lucide-react';

export default function Home() {
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string | undefined>(undefined);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <ProductCatalog onSelectProductForQuote={(title) => setSelectedProductForQuote(title)} />
        <CostEstimator initialStructureType={selectedProductForQuote} />
        <CompanyCredentials />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating Bottom Mobile Quick Contact Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden flex items-center gap-2">
        <a
          href="tel:+919951354848"
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900/95 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xl backdrop-blur-md"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call Engineer</span>
        </a>
        <a
          href="https://wa.me/919951354848?text=Hello%20Sunshade%20Solutions%2C%20I%20would%20like%20to%20inquire%20about%20a%20tensile%20structure%20quote."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xl shadow-emerald-600/30"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
