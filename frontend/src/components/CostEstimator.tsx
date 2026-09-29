'use client';

import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { apiRequest } from '@/lib/api';
import {
  Calculator,
  CheckCircle,
  Clock,
  Send,
  Building,
  Layers,
  Maximize,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Phone,
  User,
  Mail,
  MapPin,
  Check,
} from 'lucide-react';

interface CostEstimatorProps {
  initialStructureType?: string;
}

interface StructureOption {
  id: string;
  name: string;
  baseRateMin: number;
  baseRateMax: number;
  recommendedFabric: string;
  minArea: number;
  defaultArea: number;
}

interface MaterialOption {
  id: string;
  name: string;
  gsm: string;
  multiplier: number;
  description: string;
}

const structureOptions: StructureOption[] = [
  {
    id: 'tensile-structures',
    name: 'Architectural Tensile Fabric Structures',
    baseRateMin: 380,
    baseRateMax: 550,
    recommendedFabric: 'pvdf-grade-a',
    minArea: 150,
    defaultArea: 1200,
  },
  {
    id: 'car-parking',
    name: 'Commercial Tensile Car Parking Sheds',
    baseRateMin: 280,
    baseRateMax: 420,
    recommendedFabric: 'pvdf-grade-a',
    minArea: 180,
    defaultArea: 800,
  },
  {
    id: 'polycarbonate',
    name: 'Architectural Polycarbonate Canopies',
    baseRateMin: 240,
    baseRateMax: 360,
    recommendedFabric: 'polycarbonate-lexan',
    minArea: 100,
    defaultArea: 500,
  },
  {
    id: 'swimming-pool',
    name: 'Resort Swimming Pool Shade Sails',
    baseRateMin: 320,
    baseRateMax: 480,
    recommendedFabric: 'pvdf-grade-a',
    minArea: 200,
    defaultArea: 1000,
  },
  {
    id: 'industrial-sheds',
    name: 'Pre-Engineered Industrial Steel Sheds',
    baseRateMin: 260,
    baseRateMax: 410,
    recommendedFabric: 'galvalume-steel',
    minArea: 1000,
    defaultArea: 5000,
  },
  {
    id: 'gazebo-umbrella',
    name: 'Conical Gazebo & Tensile Umbrella Canopies',
    baseRateMin: 350,
    baseRateMax: 520,
    recommendedFabric: 'pvdf-grade-a',
    minArea: 100,
    defaultArea: 400,
  },
];

const materialOptions: MaterialOption[] = [
  {
    id: 'pvdf-grade-a',
    name: 'PVDF Membrane Grade A (900 GSM Mehler/Ferrari)',
    gsm: '900 GSM',
    multiplier: 1.15,
    description: 'European imported architectural fabric with self-cleaning TiO2 topcoat.',
  },
  {
    id: 'pvc-architectural',
    name: 'Architectural PVC Membrane (750 GSM)',
    gsm: '750 GSM',
    multiplier: 1.0,
    description: 'Standard heavy-duty waterproof fabric for car parking and canopies.',
  },
  {
    id: 'polycarbonate-lexan',
    name: 'Multi-wall Polycarbonate Sheets (SABIC/Lexan)',
    gsm: '10mm UV Shield',
    multiplier: 0.95,
    description: 'Impact-resistant transparent daylighting with co-extruded UV barriers.',
  },
  {
    id: 'galvalume-steel',
    name: 'Color-Coated Galvalume Industrial Steel (AZ150)',
    gsm: '0.50mm Steel',
    multiplier: 1.05,
    description: 'High tensile corrosion-resistant PEB roofing sheet for industrial warehouses.',
  },
  {
    id: 'ptfe-glass',
    name: 'PTFE Architectural Fabric (Imported Glass Fiber)',
    gsm: '1100 GSM',
    multiplier: 1.85,
    description: 'Permanent 30+ year non-combustible architectural membrane for mega-projects.',
  },
];

export default function CostEstimator({ initialStructureType }: CostEstimatorProps) {
  const [selectedStructureId, setSelectedStructureId] = useState<string>('car-parking');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('pvdf-grade-a');
  const [areaSqFt, setAreaSqFt] = useState<number>(800);

  // Form states for site visit / lead capture
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [addressOrSiteLocation, setAddressOrSiteLocation] = useState<string>('');
  const [siteVisitRequested, setSiteVisitRequested] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedLead, setSubmittedLead] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initialStructureType if triggered from catalog
  useEffect(() => {
    if (initialStructureType) {
      const match = structureOptions.find(
        (s) => s.name.toLowerCase() === initialStructureType.toLowerCase()
      );
      if (match) {
        setSelectedStructureId(match.id);
        setAreaSqFt(match.defaultArea);
      }
    }
  }, [initialStructureType]);

  const currentStructure = useMemo(
    () => structureOptions.find((s) => s.id === selectedStructureId) || structureOptions[0],
    [selectedStructureId]
  );

  const currentMaterial = useMemo(
    () => materialOptions.find((m) => m.id === selectedMaterialId) || materialOptions[0],
    [selectedMaterialId]
  );

  // Dynamic cost calculation bracket
  const calculation = useMemo(() => {
    const rawMin = currentStructure.baseRateMin * currentMaterial.multiplier * areaSqFt;
    const rawMax = currentStructure.baseRateMax * currentMaterial.multiplier * areaSqFt;

    // Rounding to clean ₹ hundreds / thousands
    const minTotal = Math.round(rawMin / 1000) * 1000;
    const maxTotal = Math.round(rawMax / 1000) * 1000;

    // Component breakdown estimates
    const membraneCost = Math.round((minTotal + maxTotal) / 2 * 0.45);
    const steelworkCost = Math.round((minTotal + maxTotal) / 2 * 0.35);
    const hardwareCivilCost = Math.round((minTotal + maxTotal) / 2 * 0.2);

    // Days timeline calculation based on area
    let timelineDays = '5 - 7 Working Days';
    if (areaSqFt > 1000 && areaSqFt <= 3000) timelineDays = '8 - 12 Working Days';
    else if (areaSqFt > 3000 && areaSqFt <= 8000) timelineDays = '14 - 21 Working Days';
    else if (areaSqFt > 8000) timelineDays = '25 - 35 Working Days';

    return {
      minTotal,
      maxTotal,
      bracketFormatted: `₹${minTotal.toLocaleString('en-IN')} - ₹${maxTotal.toLocaleString('en-IN')}`,
      avgPerSqFt: Math.round((minTotal + maxTotal) / (2 * areaSqFt)),
      membraneCost,
      steelworkCost,
      hardwareCivilCost,
      timelineDays,
    };
  }, [currentStructure, currentMaterial, areaSqFt]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        city: 'Hyderabad',
        structureType: currentStructure.name,
        fabricMaterial: currentMaterial.name,
        estimatedArea: areaSqFt,
        projectBudgetBracket: calculation.bracketFormatted,
        siteVisitRequested,
        addressOrSiteLocation: addressOrSiteLocation.trim() || 'Hyderabad / Twin Cities',
        message: message.trim() || `Generated from Cost Estimator for ${areaSqFt} Sq. Ft.`,
      };

      const data = await apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (data.success) {
        setSubmittedLead(data.lead);

        // Fire festive celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#fbbf24'],
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit quote request. Please call directly.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-slate-900/60 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" /> Instant Estimation Engine
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Real-Time Tensile Structure Cost Estimator
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light">
            Select your structure type, material grade, and project area to view immediate budget brackets calibrated for Hyderabad manufacturing and installation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive State Controls */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            {/* Step 1: Structure Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Building className="w-4 h-4" /> 1. Select Structure Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {structureOptions.map((struct) => (
                  <button
                    key={struct.id}
                    type="button"
                    onClick={() => {
                      setSelectedStructureId(struct.id);
                      if (areaSqFt < struct.minArea) {
                        setAreaSqFt(struct.defaultArea);
                      }
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      selectedStructureId === struct.id
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-md shadow-amber-500/10'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{struct.name}</span>
                      {selectedStructureId === struct.id && (
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Starting ~₹{struct.baseRateMin}/sq.ft
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Fabric & Material Grade */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Layers className="w-4 h-4" /> 2. Membrane / Cladding Specification
              </label>
              <div className="space-y-2">
                {materialOptions.map((mat) => (
                  <div
                    key={mat.id}
                    onClick={() => setSelectedMaterialId(mat.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedMaterialId === mat.id
                        ? 'border-amber-500 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{mat.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">
                          {mat.gsm}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-light">{mat.description}</p>
                    </div>
                    <div className="shrink-0">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedMaterialId === mat.id
                            ? 'border-amber-400 bg-amber-500 text-slate-950'
                            : 'border-slate-600 bg-slate-900'
                        }`}
                      >
                        {selectedMaterialId === mat.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Area Slider & Numeric Presets */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Maximize className="w-4 h-4" /> 3. Structure Area (Sq. Ft.)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={currentStructure.minArea}
                    max={50000}
                    step={50}
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Math.max(50, Number(e.target.value) || 50))}
                    className="w-28 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-right text-sm focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">Sq. Ft.</span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={currentStructure.minArea}
                max={15000}
                step={50}
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              {/* Quick Area Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs text-slate-400 self-center">Presets:</span>
                {[
                  { label: '2-Car Bay (350 sq ft)', val: 350 },
                  { label: '4-Car Bay (750 sq ft)', val: 750 },
                  { label: 'Plaza (1,500 sq ft)', val: 1500 },
                  { label: 'Campus (3,500 sq ft)', val: 3500 },
                  { label: 'PEB Shed (8,000 sq ft)', val: 8000 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setAreaSqFt(preset.val)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                      areaSqFt === preset.val
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Calculation Breakdown & One-Click Request Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Pricing Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Live Estimated Bracket
                  </span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Hyderabad Factory Price
                </span>
              </div>

              {/* Big Budget Bracket */}
              <div className="py-6 space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-['Outfit'] tracking-tight">
                  {calculation.bracketFormatted}
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Effective Average: ~₹{calculation.avgPerSqFt} / sq.ft</span>
                  <span>GST & Delivery Extra as Applicable</span>
                </div>
              </div>

              {/* Industrial Cost Distribution */}
              <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Imported Fabric / Membrane:</span>
                  <span className="font-semibold text-white">~₹{calculation.membraneCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tata/Jindal Structural Steelwork:</span>
                  <span className="font-semibold text-white">~₹{calculation.steelworkCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">SS Tensioners, Civil & Rigging:</span>
                  <span className="font-semibold text-white">~₹{calculation.hardwareCivilCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-amber-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Estimated Turnkey Erection:
                  </span>
                  <span>{calculation.timelineDays}</span>
                </div>
              </div>
            </div>

            {/* One-Click Request Official Site Visit & Quote */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
              {submittedLead ? (
                /* Post-Submission Success State */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Quote Request & Site Visit Registered!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-amber-400">{submittedLead.fullName}</strong>. Your requirement for {submittedLead.estimatedArea} Sq. Ft. has been assigned directly to Chief Engineer <strong className="text-white">S.C. Sharma</strong>.
                  </p>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-left space-y-1 font-mono text-slate-300">
                    <div>Reference ID: <span className="text-amber-400">{submittedLead._id}</span></div>
                    <div>Structure: {submittedLead.structureType}</div>
                    <div>Budget Bracket: {submittedLead.projectBudgetBracket}</div>
                    <div>Status: <span className="text-emerald-400 font-semibold">{submittedLead.status}</span></div>
                  </div>
                  <button
                    onClick={() => {
                      setSubmittedLead(null);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setAddressOrSiteLocation('');
                    }}
                    className="text-xs text-amber-400 hover:underline cursor-pointer pt-2 block mx-auto"
                  >
                    Submit another requirement
                  </button>
                </div>
              ) : (
                /* Capture Form */
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Outfit']">
                      Request Official Site Visit & Firm Quote
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Our structural engineer visits your site in Hyderabad with fabric samples & laser distance measurement tools.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Your Full Name / Company Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          placeholder="Mobile (+91 99513...)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          placeholder="Corporate Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Site Location (e.g. HITEC City, Jubilee Hills, Mallapur)"
                        value={addressOrSiteLocation}
                        onChange={(e) => setAddressOrSiteLocation(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Free Site Visit Checkbox */}
                  <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <input
                      type="checkbox"
                      checked={siteVisitRequested}
                      onChange={(e) => setSiteVisitRequested(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span>Request Free Engineering Site Inspection (Hyderabad & Secunderabad)</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 cursor-pointer"
                  >
                    {submitting ? (
                      <span>Transmitting Quote Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit for Official Site Visit & Quote</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
