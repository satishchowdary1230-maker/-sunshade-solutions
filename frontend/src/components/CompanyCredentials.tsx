'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Factory,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export default function CompanyCredentials() {
  return (
    <section id="credentials" className="py-24 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            Hyderabad Manufacturing Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Factory Direct Engineering & Plant Locations
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light">
            Visit our registered head office and heavy fabrication plant in Mallapur, Hyderabad. We welcome architects, structural consultants, and enterprise facility directors.
          </p>
        </div>

        {/* Addresses & Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Registered Head Office */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">Registered Head Office</h3>
              <p className="text-xs text-slate-400">Sunshade Solutions Corporate Administration</p>

              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>
                    401, Prasadam, Plot No.19, Road No.1, Bhaba Nagar, Mallapur, Hyderabad – 500076, Telangana, India.
                  </span>
                </div>
                <div className="flex items-center gap-2.5 pt-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-400">Monday – Saturday: 9:00 AM – 7:30 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs text-amber-400 font-medium flex items-center gap-1">
              <span>Client Meeting & Design Consultations</span>
            </div>
          </div>

          {/* Card 2: Heavy Fabrication Plant */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">Heavy Fabrication Plant</h3>
              <p className="text-xs text-slate-400">Gouthami Nagar Industrial Association</p>

              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>
                    7-94/75/434, Plot No.434, Road No.1, Gouthami Nagar Industrial Association, beside IDA Mallapur, Hyderabad – 500092.
                  </span>
                </div>
                <div className="flex items-center gap-2.5 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-400">Equipped with 25kW High-Frequency Membrane Welders</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs text-amber-400 font-medium flex items-center gap-1">
              <span>Direct Factory Visits & Mockup Inspection</span>
            </div>
          </div>

          {/* Card 3: Key Contacts & Leadership */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">Engineering Leadership</h3>
              <p className="text-xs text-slate-400">Direct Consultation with S.C. Sharma</p>

              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <span className="text-xs text-slate-500 block">Direct Calling Lines:</span>
                  <a
                    href="tel:+919951354848"
                    className="text-amber-400 hover:underline font-mono font-bold block"
                  >
                    +91 99513 54848
                  </a>
                  <a
                    href="tel:+919951390898"
                    className="text-slate-300 hover:text-white font-mono text-xs block mt-0.5"
                  >
                    +91 99513 90898
                  </a>
                </div>

                <div className="pt-2">
                  <span className="text-xs text-slate-500 block">Official Emails:</span>
                  <a
                    href="mailto:scsharma@sunshadeindia.com"
                    className="text-slate-200 hover:text-amber-400 text-xs block"
                  >
                    scsharma@sunshadeindia.com
                  </a>
                  <a
                    href="mailto:info@sunshadeindia.com"
                    className="text-slate-400 hover:text-amber-400 text-xs block"
                  >
                    info@sunshadeindia.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <a
                href="https://wa.me/919951354848?text=Hello%20Sunshade%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project%20in%20Hyderabad."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Google Maps for Mallapur Industrial Area, Hyderabad */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Mallapur & IDA Industrial Belt, Hyderabad
              </h3>
              <p className="text-xs text-slate-400">
                Centrally located manufacturing cluster with direct arterial access to HITEC City, Cherlapally, and Outer Ring Road (ORR).
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=IDA+Mallapur+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all self-start sm:self-auto"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-950">
            <iframe
              title="Sunshade Solutions Mallapur Hyderabad Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.978589782522!2d78.57218685!3d17.44799015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c063cfcb88d%3A0x6b772091fc0b5b15!2sMallapur%2C%20Secunderabad%2C%20Telangana%20500076!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
