import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, Wrench, ArrowRight, PhoneCall, CheckCircle2, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
      {/* Background Architectural Image with Industrial Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/tensile_hero.jpg"
          alt="Sunshade Solutions Architectural Tensile Structure Hyderabad"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        {/* Subtle industrial grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            {/* Engineering Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Factory Direct • IDA Mallapur, Hyderabad
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-['Outfit'] leading-[1.1]">
              Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Architectural Tensile</span> Structures in Hyderabad
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              We design, fabricate, and erect German PVDF membrane tensile canopies, commercial car parking sheds, and heavy industrial PEB structures across Telangana and South India. Engineered for severe cyclonic wind ratings and zero maintenance.
            </p>

            {/* Credential Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Imported Mehler & Serge Ferrari PVDF (900+ GSM)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Certified for 150+ km/h Cyclonic Wind Resistance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>In-House High Frequency Welding & Steel Fabrication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>10-Year Comprehensive Membrane Warranty</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="#calculator"
                className="flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base tracking-wide shadow-xl shadow-amber-500/25 transform hover:-translate-y-0.5 transition-all"
              >
                <span>Calculate Instant Cost</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="tel:+919951354848"
                className="flex items-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 backdrop-blur-md shadow-lg transition-all"
              >
                <PhoneCall className="w-5 h-5 text-amber-400" />
                <span>Talk to Engineer (+91 99513 54848)</span>
              </a>
            </div>

            {/* Location Tag */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Plant: Gouthami Nagar Industrial Association, beside IDA Mallapur, Hyderabad – 500092</span>
            </div>
          </div>

          {/* Right Floating Credentials Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/85 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">Engineering Credentials</h3>
                  <p className="text-xs text-slate-400">Hyderabad Manufacturing Plant</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-2xl font-black text-amber-400 font-['Outfit']">850+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Projects Delivered in South India</div>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-2xl font-black text-amber-400 font-['Outfit']">18+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Years Industrial Excellence</div>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-2xl font-black text-amber-400 font-['Outfit']">1.5M</div>
                  <div className="text-xs text-slate-400 mt-0.5">Sq. Ft. Fabricated Area</div>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400 font-['Outfit']">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Free Twin Cities Site Visits</div>
                </div>
              </div>

              {/* Direct Leadership Banner */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 text-sm">
                  SCS
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">S.C. Sharma</h4>
                  <p className="text-xs text-slate-400">Chief Managing Engineer & Founder</p>
                  <p className="text-xs text-amber-400 font-mono">+91 99513 54848 / 90898</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
