export interface ProductData {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technicalSpecs: {
    fabricGsm: string;
    tensileStrength: string;
    windResistanceKmph: number;
    steelGrade: string;
    lifespanYears: string;
    warranty: string;
    uvProtection: string;
    fireRating: string;
  };
  idealApplications: string[];
  priceRangePerSqFt: {
    min: number;
    max: number;
  };
  imageUrl: string;
  features: string[];
  featured: boolean;
}

export const initialProducts: ProductData[] = [
  {
    title: 'Architectural Tensile Fabric Structures',
    slug: 'tensile-fabric-structures',
    category: 'Tensile Fabric',
    shortDescription:
      'Engineered hyperbolic paraboloid and conic architectural membrane structures for landmark corporate plazas and cultural centers.',
    fullDescription:
      'Sunshade Solutions engineers world-class architectural tensile fabric structures designed to create iconic silhouettes while providing robust thermal and weather protection. Manufactured at our Mallapur fabrication plant using imported European PVDF membranes (Mehler Texnologies / Serge Ferrari), each canopy is structurally analyzed for Hyderabad wind zones and extreme summer heat.',
    technicalSpecs: {
      fabricGsm: '850 - 1050 GSM PVDF Membrane',
      tensileStrength: '4000 / 3800 N/5cm (Warp / Weft)',
      windResistanceKmph: 160,
      steelGrade: 'Tata / Jindal YSt-310 High Tensile Tubular Steel',
      lifespanYears: '20+ Years',
      warranty: '10 Years Manufacturer Warranty',
      uvProtection: '100% UV Block (UV-A & UV-B Resistant)',
      fireRating: 'DIN 4102 B1 / Flame Retardant Class 1',
    },
    idealApplications: [
      'Corporate Campus Plazas & Amphitheatres',
      'Shopping Mall Atriums & Entrance Portals',
      'Sports Stadium Stands & Pavilions',
      'Public Transit Terminals & Toll Plazas',
    ],
    priceRangePerSqFt: {
      min: 380,
      max: 650,
    },
    imageUrl: '/images/products/tensile-fabric-structures.jpg',
    features: [
      'Self-cleaning TiO2 / PVDF lacquered topcoat',
      'High solar reflectance index (reduces ambient temp up to 10°C)',
      'CAD patterned & high-frequency thermal welded seams',
      'Grade SS-316 stainless steel tensioners and perimeter cables',
    ],
    featured: true,
  },
  {
    title: 'Commercial Tensile Car Parking Sheds',
    slug: 'commercial-car-parking-sheds',
    category: 'Car Parking',
    shortDescription:
      'Heavy-duty cantilever, wave, and modular multi-bay parking shades engineered for IT parks, hospitals, and luxury apartments.',
    fullDescription:
      'Our commercial tensile car parking canopies protect luxury automobiles and fleet vehicles from solar UV degradation, hailstorms, and heavy rainfall. Featuring clear-span cantilever engineering that eliminates intrusive front columns, facilitating easy vehicle turning and maximum bay capacity. Fabricated with precision at our Gouthami Nagar Industrial unit.',
    technicalSpecs: {
      fabricGsm: '750 - 900 GSM Heavy PVC-PVDF Membrane',
      tensileStrength: '3500 / 3000 N/5cm',
      windResistanceKmph: 140,
      steelGrade: 'Hot-Dipped Galvanized Mild Steel (IS 2062 Grade)',
      lifespanYears: '15 - 20 Years',
      warranty: '8 Years Warranty',
      uvProtection: '98% Solar UV Absorption',
      fireRating: 'Class B-s2, d0',
    },
    idealApplications: [
      'HITEC City & Gachibowli Tech Parks',
      'Hospital Emergency & Doctor Parking Bays',
      'Automobile Dealership Forecourts',
      'Premium Gated Community Visitor Parking',
    ],
    priceRangePerSqFt: {
      min: 280,
      max: 480,
    },
    imageUrl: '/images/products/car-parking-shed.jpg',
    features: [
      'Zero-column cantilever arm design for effortless vehicle parking',
      'Epoxy primer with polyurethane two-pack automotive grade paint finish',
      'Integrated rainwater drip gutters and discharge spouts',
      'Modular expandability for unlimited bay configurations',
    ],
    featured: true,
  },
  {
    title: 'Architectural Polycarbonate Canopies',
    slug: 'polycarbonate-canopies',
    category: 'Polycarbonate',
    shortDescription:
      'High-impact UV-coated multiwall and solid polycarbonate arched walkways, entrance porches, and skylight systems.',
    fullDescription:
      'Sunshade Solutions designs and installs architectural polycarbonate canopies providing 200x the impact resistance of glass while remaining half the weight. Ideal for illuminated pedestrian entrance porches, hospital drop-off bays, and commercial walkways requiring natural day-lighting without solar thermal greenhouse heat.',
    technicalSpecs: {
      fabricGsm: '6mm to 16mm Multiwall / 3mm to 6mm Solid Sheet',
      tensileStrength: '60 MPa Tensile Yield',
      windResistanceKmph: 130,
      steelGrade: 'CNC Bent MS Hollow Sections & Aluminum Joinery',
      lifespanYears: '15+ Years',
      warranty: '10 Years Limited UV Yellowing Warranty',
      uvProtection: 'Co-extruded UV Absorber Shield (Both sides)',
      fireRating: 'Self-extinguishing Class 1 (BS 476)',
    },
    idealApplications: [
      'Corporate Headquarters Main Entrance Porticos',
      'Inter-Building Connecting Covered Walkways',
      'School & Hospital Drop-off Zones',
      'Residential Penthouse Terrace Solariums',
    ],
    priceRangePerSqFt: {
      min: 220,
      max: 380,
    },
    imageUrl: '/images/products/polycarbonate-canopy.jpg',
    features: [
      'SABIC Lexan / Bayer Makrolon raw material grade',
      'Hermetically sealed EPDM gaskets preventing water ingress',
      'Anti-condensation inner coating',
      'Choice of Clear, Bronze, Opal White, and Blue-Green tinting',
    ],
    featured: true,
  },
  {
    title: 'Resort Swimming Pool Shade Sails',
    slug: 'swimming-pool-shades',
    category: 'Swimming Pool',
    shortDescription:
      'Hyperbolic paraboloid dual-tone tensile shade sails designed for luxury swimming pools, splash decks, and resort lounges.',
    fullDescription:
      'Keep pool water cool and swimmers shielded from dangerous sunburn during peak Hyderabad summer heat. Our swimming pool tensile structures feature chlorine-resistant, mildew-proof fabrics tensioned between marine-grade 316 stainless steel masts. Custom three-dimensional sail formations create a breathtaking oasis ambiance.',
    technicalSpecs: {
      fabricGsm: '850 GSM PVDF or 340 GSM Commercial HDPE Shade Fabric',
      tensileStrength: '3200 / 2800 N/5cm',
      windResistanceKmph: 150,
      steelGrade: 'Marine Grade SS-316 & Galvanized Epoxy Coated Steel',
      lifespanYears: '12 - 18 Years',
      warranty: '7 Years Warranty',
      uvProtection: '95% to 99% UV Block Rating',
      fireRating: 'Flame Retardant NFPA 701',
    },
    idealApplications: [
      '5-Star Luxury Resort Pools & Sun Decks',
      'Gated Community Clubhouses & Kids Splash Pools',
      'Sports Academy Olympic Training Pools',
      'Boutique Hotel Rooftop Infinity Pools',
    ],
    priceRangePerSqFt: {
      min: 320,
      max: 550,
    },
    imageUrl: '/images/products/swimming-pool-shade.jpg',
    features: [
      'Resistant to chlorine fumes, salt mist, and mildew growth',
      'Double-stitched reinforced perimeter webbing with wire rope borders',
      'Breathable option available for airflow and heat dissipation',
      'Available in custom curved sail arrangements',
    ],
    featured: true,
  },
  {
    title: 'Pre-Engineered Industrial Steel Sheds',
    slug: 'industrial-steel-sheds',
    category: 'Industrial Sheds',
    shortDescription:
      'Turnkey Pre-Engineered Building (PEB) industrial sheds, factory workshops, and logistics warehouses with crane gantries.',
    fullDescription:
      'From our manufacturing plant in Gouthami Nagar Industrial Association beside IDA Mallapur, Sunshade Solutions fabricates heavy pre-engineered industrial steel sheds. Tailored for heavy manufacturing, pharmaceuticals, plastics, and engineering workshops, featuring clear spans up to 45 meters, crane runway beams, and insulated roofing.',
    technicalSpecs: {
      fabricGsm: '0.50mm / 0.60mm Galvalume Color Coated Sheets (AZ150)',
      tensileStrength: '550 MPa High Tensile Steel (ASTM A792)',
      windResistanceKmph: 180,
      steelGrade: 'E350 & E250 Structural Steel Portal Frames',
      lifespanYears: '30+ Years',
      warranty: '15 Years Material Structural Warranty',
      uvProtection: 'SMP / PVDF Solar Heat Reflective Paint',
      fireRating: 'Non-combustible Class A',
    },
    idealApplications: [
      'IDA Mallapur & Cherlapally Manufacturing Plants',
      'Pharmaceutical Production & Cleanroom Warehouses',
      'Automotive Ancillary Fabrication Workshops',
      'Heavy EOT Crane Bay Industrial Sheds',
    ],
    priceRangePerSqFt: {
      min: 260,
      max: 450,
    },
    imageUrl: '/images/products/industrial-shed.jpg',
    features: [
      'Custom designed for 5 Ton to 30 Ton EOT overhead cranes',
      'Natural turbo ventilators and polycarbonate ridge skylight strips',
      'Rockwool / Glasswool thermal insulation for ambient cooling',
      'Rapid turnkey erection with computerized STAAD.Pro structural verification',
    ],
    featured: true,
  },
  {
    title: 'Conical Gazebo & Tensile Umbrella Canopies',
    slug: 'gazebo-umbrella-canopies',
    category: 'Gazebo & Umbrella',
    shortDescription:
      'Iconic single-column inverted & conical tensile umbrellas for upscale rooftop restaurants, garden dining, and hotel lawns.',
    fullDescription:
      'Designed to transform outdoor spaces into revenue-generating dining and relaxation sanctuaries. Our tensile gazebos and architectural umbrellas feature an engineered single heavy central mast that eliminates ground obstruction, integrated hidden internal rainwater downspouts, and mounting provisions for ambient warm downlights.',
    technicalSpecs: {
      fabricGsm: '750 - 900 GSM Architectural PVDF Fabric',
      tensileStrength: '3000 / 2800 N/5cm',
      windResistanceKmph: 140,
      steelGrade: 'High Gauge Seamless Heavy Tubular Steel',
      lifespanYears: '15+ Years',
      warranty: '8 Years Warranty',
      uvProtection: '99% UV Block',
      fireRating: 'B1 Din 4102',
    },
    idealApplications: [
      'Jubilee Hills & Banjara Hills Rooftop Lounge Bars',
      'Resort Alfresco Lawns & Banquet Outdoor Spaces',
      'Private Farmhouses & Villa Courtyards in Gandipet',
      'Golf Course Halfway Huts & Club Cafes',
    ],
    priceRangePerSqFt: {
      min: 350,
      max: 580,
    },
    imageUrl: '/images/products/gazebo-umbrella.jpg',
    features: [
      'Internal water drainage system piped through central mast column',
      'Integrated brackets for lighting, ceiling fans, and misting nozzles',
      'Wide standard sizes from 3m x 3m up to 10m x 10m clear span',
      'High wind stability with certified base plate anchor design',
    ],
    featured: true,
  },
];
