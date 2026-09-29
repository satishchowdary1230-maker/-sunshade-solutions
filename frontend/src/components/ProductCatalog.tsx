'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { initialProducts, ProductData } from '@/data/seedData';
import {
  Layers,
  Wind,
  Shield,
  Clock,
  ArrowRight,
  Maximize2,
  X,
  CheckCircle2,
  FileText,
  Calculator,
} from 'lucide-react';

interface ProductCatalogProps {
  onSelectProductForQuote?: (productTitle: string) => void;
}

export default function ProductCatalog({ onSelectProductForQuote }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductData | null>(null);

  const categories = [
    'All',
    'Tensile Fabric',
    'Car Parking',
    'Polycarbonate',
    'Swimming Pool',
    'Industrial Sheds',
    'Gazebo & Umbrella',
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? initialProducts
      : initialProducts.filter((p) => p.category === selectedCategory);

  const handleEstimateClick = (productTitle: string) => {
    if (onSelectProductForQuote) {
      onSelectProductForQuote(productTitle);
    }
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-24 bg-slate-950 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            Fabricated in Mallapur, Hyderabad
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Engineered Tensile & Industrial Catalog
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-light">
            Every structure is custom designed, 3D modeled, and manufactured to withstand high wind velocity and intense Telangana summer thermal loads.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 gap-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'All Products (6)' : cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.slug}
              className="group bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Category Pill */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-semibold">
                    {product.category}
                  </span>
                </div>

                {/* Price Bracket Tag */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-xs text-slate-400 block font-medium">Estimated Pricing</span>
                  <span className="text-base font-black text-white font-['Outfit']">
                    ₹{product.priceRangePerSqFt.min} - ₹{product.priceRangePerSqFt.max}{' '}
                    <span className="text-xs font-normal text-slate-400">/ sq.ft</span>
                  </span>
                </div>

                {/* Quick Expand Button */}
                <button
                  onClick={() => setActiveModalProduct(product)}
                  className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-lg bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 border border-slate-700/80 flex items-center justify-center transition-all cursor-pointer"
                  title="View Full Engineering Specs"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit'] group-hover:text-amber-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light mt-2 line-clamp-3 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                    <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{product.technicalSpecs.fabricGsm}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                    <Wind className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{product.technicalSpecs.windResistanceKmph} km/h Wind</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                    <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{product.technicalSpecs.warranty}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{product.technicalSpecs.lifespanYears}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleEstimateClick(product.title)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer shadow-md shadow-amber-500/10"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Instant Estimate</span>
                  </button>

                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Specs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Specs Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-semibold">
                {activeModalProduct.category}
              </span>
              <h3 className="text-2xl font-bold text-white font-['Outfit'] mt-2">
                {activeModalProduct.title}
              </h3>
              <p className="text-sm text-slate-300 mt-2 font-light leading-relaxed">
                {activeModalProduct.fullDescription}
              </p>
            </div>

            {/* Technical Specifications Sheet */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Technical & Material Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400">Fabric/Membrane:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.fabricGsm}</p>
                </div>
                <div>
                  <span className="text-slate-400">Tensile Strength:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.tensileStrength}</p>
                </div>
                <div>
                  <span className="text-slate-400">Wind Load Resistance:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.windResistanceKmph} km/h (IS 875 Part 3)</p>
                </div>
                <div>
                  <span className="text-slate-400">Structural Steel Grade:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.steelGrade}</p>
                </div>
                <div>
                  <span className="text-slate-400">UV Protection:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.uvProtection}</p>
                </div>
                <div>
                  <span className="text-slate-400">Fire Retardancy:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.fireRating}</p>
                </div>
                <div>
                  <span className="text-slate-400">Design Lifespan:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.lifespanYears}</p>
                </div>
                <div>
                  <span className="text-slate-400">Warranty:</span>
                  <p className="text-white font-medium">{activeModalProduct.technicalSpecs.warranty}</p>
                </div>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Key Engineering Advantages
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {activeModalProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Applications */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Recommended Applications
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProduct.idealApplications.map((app, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Indicative Pricing</span>
                <span className="text-lg font-black text-amber-400 font-['Outfit']">
                  ₹{activeModalProduct.priceRangePerSqFt.min} - ₹{activeModalProduct.priceRangePerSqFt.max}{' '}
                  <span className="text-xs text-slate-400">/ sq.ft</span>
                </span>
              </div>
              <button
                onClick={() => {
                  const title = activeModalProduct.title;
                  setActiveModalProduct(null);
                  handleEstimateClick(title);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer"
              >
                <span>Calculate for this Model</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
