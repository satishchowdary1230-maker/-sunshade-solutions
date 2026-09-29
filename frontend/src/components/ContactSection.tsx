'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import { apiRequest } from '@/lib/api';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [structureType, setStructureType] = useState('Commercial Tensile Car Parking Sheds');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError('Please fill in your name, mobile number, and email.');
      return;
    }

    try {
      setLoading(true);
      const data = await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          fullName: name.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          city: 'Hyderabad',
          structureType,
          fabricMaterial: 'PVDF Architectural Grade',
          estimatedArea: 500,
          projectBudgetBracket: 'Custom Tender / Inquired',
          siteVisitRequested: true,
          addressOrSiteLocation: 'Hyderabad / Telangana',
          message: message.trim() || 'General Engineering Inquiry via Contact Form',
        }),
      });
      if (data.success) {
        setSuccess(true);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } else {
        setError(data.error || 'Failed to submit inquiry. Please call directly.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/40 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              Direct Contact & Tender Support
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Speak Directly with S.C. Sharma
            </h2>
            <p className="text-base text-slate-300 font-light leading-relaxed">
              Whether you are an architect designing a marquee corporate canopy or a project manager requiring turnkey industrial sheds, our engineering team provides structural feasibility and CAD layout consulting.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href="tel:+919951354848"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Primary Mobile Line</span>
                  <span className="text-base font-bold text-white font-mono group-hover:text-amber-400 transition-colors">
                    +91 99513 54848
                  </span>
                </div>
              </a>

              <a
                href="tel:+919951390898"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Secondary Executive Line</span>
                  <span className="text-base font-bold text-white font-mono group-hover:text-amber-400 transition-colors">
                    +91 99513 90898
                  </span>
                </div>
              </a>

              <a
                href="mailto:scsharma@sunshadeindia.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Official Inquiry Email</span>
                  <span className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                    scsharma@sunshadeindia.com
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Fast Contact Form */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {success ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">Inquiry Dispatched!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Our engineering team has received your message. S.C. Sharma will connect with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">Send Project Inquiry</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in your project requirements for technical evaluation and quotation.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Chandra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 98490..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Structure Type</label>
                    <select
                      value={structureType}
                      onChange={(e) => setStructureType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Architectural Tensile Fabric Structures">Architectural Tensile Fabric Structures</option>
                      <option value="Commercial Tensile Car Parking Sheds">Commercial Tensile Car Parking Sheds</option>
                      <option value="Architectural Polycarbonate Canopies">Architectural Polycarbonate Canopies</option>
                      <option value="Resort Swimming Pool Shade Sails">Resort Swimming Pool Shade Sails</option>
                      <option value="Pre-Engineered Industrial Steel Sheds">Pre-Engineered Industrial Steel Sheds</option>
                      <option value="Conical Gazebo & Tensile Umbrella Canopies">Conical Gazebo & Tensile Umbrella Canopies</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Project Details / Message</label>
                    <textarea
                      rows={3}
                      placeholder="Describe site location, approximate area, or required completion timeline..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Project Details</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
