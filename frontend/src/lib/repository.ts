import { connectToDatabase } from './db';
import Lead, { ILead, LeadStatus } from '@/models/Lead';
import Product, { IProduct } from '@/models/Product';
import { initialProducts, ProductData } from '@/data/seedData';

// Fallback in-memory storage for resilient local preview / offline operation
export interface LeadItem {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  structureType: string;
  fabricMaterial: string;
  estimatedArea: number;
  projectBudgetBracket: string;
  siteVisitRequested: boolean;
  addressOrSiteLocation?: string;
  message?: string;
  status: LeadStatus;
  notes: { text: string; createdAt: string }[];
  createdAt: string;
  updatedAt: string;
}

// Initial demonstration leads representing authentic Hyderabad enterprise clients
let memoryLeads: LeadItem[] = [
  {
    _id: 'lead-hyderabad-101',
    fullName: 'K. Rajasekhar Rao',
    email: 'k.rajasekhar@cybertowers-facilities.in',
    phone: '+91 98490 12345',
    city: 'Hyderabad',
    structureType: 'Commercial Tensile Car Parking Sheds',
    fabricMaterial: 'PVDF Membrane Grade A (900 GSM Mehler)',
    estimatedArea: 4200,
    projectBudgetBracket: '₹14,50,000 - ₹17,80,000',
    siteVisitRequested: true,
    addressOrSiteLocation: 'Cyber Gateway Campus, Madhapur, Hyderabad – 500081',
    message: 'Require tensile car parking canopies for 40 executive parking bays before monsoon season.',
    status: 'Site Visit Scheduled',
    notes: [
      { text: 'Site engineer S.C. Sharma scheduled inspection on Thursday 11:00 AM.', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'lead-hyderabad-102',
    fullName: 'Venkat Ramanathan',
    email: 'v.ramanathan@novotelresort.com',
    phone: '+91 97011 88990',
    city: 'Hyderabad',
    structureType: 'Resort Swimming Pool Shade Sails',
    fabricMaterial: 'PVDF Architectural Membrane (850 GSM)',
    estimatedArea: 1800,
    projectBudgetBracket: '₹6,80,000 - ₹8,20,000',
    siteVisitRequested: true,
    addressOrSiteLocation: 'Near HICC, HITEC City, Hyderabad',
    message: 'Need 3 sail shades over main pool and children pool with SS 316 rigging.',
    status: 'Contacted',
    notes: [
      { text: 'Spoke over phone. Sent technical CAD catalog via WhatsApp.', createdAt: new Date(Date.now() - 43200000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 72000000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    _id: 'lead-hyderabad-103',
    fullName: 'Ananya Deshmukh',
    email: 'ananya@bengaluru-infra.com',
    phone: '+91 94400 55432',
    city: 'Secunderabad',
    structureType: 'Architectural Polycarbonate Canopies',
    fabricMaterial: 'Multi-wall Polycarbonate Sheets (SABIC/Lexan)',
    estimatedArea: 850,
    projectBudgetBracket: '₹2,30,000 - ₹2,90,000',
    siteVisitRequested: false,
    addressOrSiteLocation: 'Near Clock Tower, SD Road, Secunderabad',
    message: 'Hospital walkway covered canopy connecting OPD building to diagnostic wing.',
    status: 'New',
    notes: [],
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    updatedAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

let memoryProducts: (ProductData & { _id: string })[] = initialProducts.map((p, idx) => ({
  ...p,
  _id: `prod-${idx + 1}`,
}));

export async function getProducts(): Promise<any[]> {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      let products = await Product.find({}).sort({ createdAt: -1 }).lean();
      if (products.length === 0) {
        // Auto-seed if empty
        await Product.insertMany(initialProducts);
        products = await Product.find({}).sort({ createdAt: -1 }).lean();
      }
      return products;
    }
  } catch (error) {
    console.warn('Using memory store for products:', (error as Error).message);
  }
  return memoryProducts;
}

export async function getProductBySlug(slug: string): Promise<any | null> {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const product = await Product.findOne({ slug }).lean();
      if (product) return product;
    }
  } catch (error) {
    console.warn('Product find error, using fallback:', (error as Error).message);
  }
  return memoryProducts.find((p) => p.slug === slug) || null;
}

export async function createLead(data: {
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  structureType: string;
  fabricMaterial: string;
  estimatedArea: number;
  projectBudgetBracket: string;
  siteVisitRequested?: boolean;
  addressOrSiteLocation?: string;
  message?: string;
}): Promise<any> {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const lead = await Lead.create({
        ...data,
        status: 'New',
        notes: [],
      });
      return lead.toObject();
    }
  } catch (error) {
    console.warn('Using memory store for creating lead:', (error as Error).message);
  }

  // Fallback memory creation
  const newLead: LeadItem = {
    _id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    city: data.city || 'Hyderabad',
    structureType: data.structureType,
    fabricMaterial: data.fabricMaterial,
    estimatedArea: Number(data.estimatedArea),
    projectBudgetBracket: data.projectBudgetBracket,
    siteVisitRequested: data.siteVisitRequested !== false,
    addressOrSiteLocation: data.addressOrSiteLocation || '',
    message: data.message || '',
    status: 'New',
    notes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  memoryLeads.unshift(newLead);
  return newLead;
}

export async function getLeads(status?: string, search?: string): Promise<any[]> {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const query: any = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (search && search.trim() !== '') {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [
          { fullName: regex },
          { email: regex },
          { phone: regex },
          { structureType: regex },
          { addressOrSiteLocation: regex },
        ];
      }
      return await Lead.find(query).sort({ createdAt: -1 }).lean();
    }
  } catch (error) {
    console.warn('Using memory store for fetching leads:', (error as Error).message);
  }

  // Memory fallback filtering
  let leads = [...memoryLeads];
  if (status && status !== 'All') {
    leads = leads.filter((l) => l.status === status);
  }
  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.structureType.toLowerCase().includes(q) ||
        (l.addressOrSiteLocation && l.addressOrSiteLocation.toLowerCase().includes(q))
    );
  }
  return leads;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  noteText?: string
): Promise<any | null> {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const updateData: any = { status };
      if (noteText && noteText.trim()) {
        updateData.$push = { notes: { text: noteText.trim(), createdAt: new Date() } };
      }
      const updated = await Lead.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (updated) return updated;
    }
  } catch (error) {
    console.warn('Using memory store for updating lead:', (error as Error).message);
  }

  // Memory fallback
  const leadIndex = memoryLeads.findIndex((l) => l._id === id);
  if (leadIndex === -1) return null;

  memoryLeads[leadIndex].status = status;
  memoryLeads[leadIndex].updatedAt = new Date().toISOString();
  if (noteText && noteText.trim()) {
    memoryLeads[leadIndex].notes.push({
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
    });
  }

  return memoryLeads[leadIndex];
}

export async function deleteLead(id: string): Promise<boolean> {
  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const res = await Lead.findByIdAndDelete(id);
      if (res) return true;
    }
  } catch (error) {
    console.warn('Using memory store for deleting lead:', (error as Error).message);
  }

  const initialLen = memoryLeads.length;
  memoryLeads = memoryLeads.filter((l) => l._id !== id);
  return memoryLeads.length < initialLen;
}

export async function getLeadStats() {
  const allLeads = await getLeads();
  const totalLeads = allLeads.length;
  const newLeads = allLeads.filter((l) => l.status === 'New').length;
  const siteVisitsScheduled = allLeads.filter((l) => l.status === 'Site Visit Scheduled').length;
  const closedDeals = allLeads.filter((l) => l.status === 'Closed').length;

  return {
    totalLeads,
    newLeads,
    siteVisitsScheduled,
    closedDeals,
  };
}
