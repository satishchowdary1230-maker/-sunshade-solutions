import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, Radio, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Factory Statement */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-amber-400 fill-none stroke-current stroke-2"
                  >
                    <path d="M3 19L12 4L21 19Z" strokeLinejoin="round" />
                    <path d="M12 4V19" strokeDasharray="2 2" />
                    <path d="M7.5 11.5L16.5 11.5" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-black text-white font-['Outfit'] tracking-tight">
                SUNSHADE<span className="text-amber-400">.</span>SOLUTIONS
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              South India&apos;s specialist engineering and fabrication enterprise for architectural membrane canopies, modular commercial car parking sheds, and heavy PEB industrial sheds. Built with imported European fabrics and Tata steel.
            </p>
            <div className="pt-2 text-slate-500 text-[11px]">
              ISO 9001:2015 Fabrication Standards • Mallapur IDA, Hyderabad
            </div>
          </div>

          {/* Quick Product Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">Manufactured Products</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="#products" className="hover:text-amber-400 transition-colors">
                  Architectural Tensile Structures
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-amber-400 transition-colors">
                  Commercial Car Parking Sheds
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-amber-400 transition-colors">
                  Polycarbonate Arched Canopies
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-amber-400 transition-colors">
                  Resort Swimming Pool Shade Sails
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-amber-400 transition-colors">
                  Pre-Engineered Industrial Steel Sheds
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-amber-400 transition-colors">
                  Conical Gazebo & Tensile Umbrellas
                </Link>
              </li>
            </ul>
          </div>

          {/* Hyderabad Facility Locations */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">Hyderabad Facilities</h4>
            <div className="space-y-3">
              <div>
                <span className="text-slate-300 font-semibold block">Office:</span>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  401, Prasadam, Plot No.19, Road No.1, Bhaba Nagar, Mallapur, Hyderabad – 500076.
                </p>
              </div>
              <div>
                <span className="text-slate-300 font-semibold block">Factory Plant:</span>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  7-94/75/434, Plot No.434, Road No.1, Gouthami Nagar Industrial Association, beside IDA Mallapur, Hyderabad – 500092.
                </p>
              </div>
            </div>
          </div>

          {/* Contacts & Admin Link */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-white">Direct Connect</h4>
            <div className="space-y-2">
              <a
                href="tel:+919951354848"
                className="hover:text-amber-400 text-amber-400 font-mono font-bold block"
              >
                +91 99513 54848
              </a>
              <a
                href="tel:+919951390898"
                className="hover:text-white text-slate-400 font-mono block"
              >
                +91 99513 90898
              </a>
              <a
                href="mailto:scsharma@sunshadeindia.com"
                className="hover:text-amber-400 text-slate-300 block truncate"
              >
                scsharma@sunshadeindia.com
              </a>
              <a
                href="mailto:info@sunshadeindia.com"
                className="hover:text-amber-400 text-slate-400 block truncate"
              >
                info@sunshadeindia.com
              </a>
            </div>

            <div className="pt-3">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 hover:text-white hover:border-slate-700 transition-all text-[11px]"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Admin Live Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Sunshade Solutions. All Rights Reserved. Engineered by S.C. Sharma.
          </div>
          <div className="flex items-center gap-6">
            <span>Telangana Industrial Corporation Approved Vendor</span>
            <a href="#top" className="hover:text-amber-400 flex items-center gap-1">
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
