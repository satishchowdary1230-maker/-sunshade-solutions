const Lead = require('../models/Lead');
const { getDbStatus } = require('../config/db');
const {
  broadcastNewLead,
  broadcastLeadUpdated,
  broadcastLeadDeleted,
} = require('../socket/socketHandler');

// Resilient In-Memory Fallback
let memoryLeads = [
  {
    _id: 'lead-hyderabad-101',
    fullName: 'K. Rajasekhar Rao',
    email: 'k.rajasekhar@cybertowers-facilities.in',
    phone: '+91 98490 12345',
    city: 'Hyderabad',
    structureType: 'Commercial Tensile Car Parking Sheds',
    fabricMaterial: 'PVDF Membrane Grade A (900 GSM Mehler/Ferrari)',
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

// Active SSE client connections
const sseClients = new Set();

function broadcastSSE(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// 1. Get Leads
exports.getLeads = async (req, res) => {
  try {
    const { status, search } = req.query;

    if (getDbStatus()) {
      const query = {};
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
      const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
      return res.json({ success: true, count: leads.length, leads });
    }

    // Memory Store
    let leads = [...memoryLeads];
    if (status && status !== 'All') {
      leads = leads.filter((l) => l.status === status);
    }
    if (search && search.trim()) {
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

    return res.json({ success: true, count: leads.length, leads });
  } catch (err) {
    console.error('Error fetching leads:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Create Lead & Broadcast in Real-Time
exports.createLead = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      structureType,
      fabricMaterial,
      estimatedArea,
      projectBudgetBracket,
      siteVisitRequested,
      addressOrSiteLocation,
      message,
    } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email is required' });
    }
    if (!phone || phone.trim().length < 8) {
      return res.status(400).json({ success: false, error: 'Valid phone is required' });
    }
    if (!structureType) {
      return res.status(400).json({ success: false, error: 'Structure type is required' });
    }

    let newLead;

    if (getDbStatus()) {
      const created = await Lead.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        city: city || 'Hyderabad',
        structureType,
        fabricMaterial: fabricMaterial || 'PVDF Architectural Grade',
        estimatedArea: Number(estimatedArea) || 500,
        projectBudgetBracket: projectBudgetBracket || 'Under Assessment',
        siteVisitRequested: siteVisitRequested !== false,
        addressOrSiteLocation: addressOrSiteLocation || 'Hyderabad',
        message: message || '',
        status: 'New',
        notes: [],
      });
      newLead = created.toObject();
    } else {
      newLead = {
        _id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        city: city || 'Hyderabad',
        structureType,
        fabricMaterial: fabricMaterial || 'PVDF Architectural Grade',
        estimatedArea: Number(estimatedArea) || 500,
        projectBudgetBracket: projectBudgetBracket || 'Under Assessment',
        siteVisitRequested: siteVisitRequested !== false,
        addressOrSiteLocation: addressOrSiteLocation || 'Hyderabad',
        message: message || '',
        status: 'New',
        notes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      memoryLeads.unshift(newLead);
    }

    // 🚀 REAL-TIME BROADCAST VIA SOCKET.IO & SSE
    broadcastNewLead(newLead);
    broadcastSSE('lead:created', newLead);

    return res.status(201).json({
      success: true,
      message: 'Quote request registered successfully',
      lead: newLead,
    });
  } catch (err) {
    console.error('Error creating lead:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 3. Update Lead Status / Add Note
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    let updatedLead;

    if (getDbStatus()) {
      const updateData = {};
      if (status) updateData.status = status;
      if (note && note.trim()) {
        updateData.$push = { notes: { text: note.trim(), createdAt: new Date() } };
      }
      updatedLead = await Lead.findByIdAndUpdate(id, updateData, { new: true }).lean();
    } else {
      const idx = memoryLeads.findIndex((l) => l._id === id);
      if (idx !== -1) {
        if (status) memoryLeads[idx].status = status;
        memoryLeads[idx].updatedAt = new Date().toISOString();
        if (note && note.trim()) {
          memoryLeads[idx].notes.push({ text: note.trim(), createdAt: new Date().toISOString() });
        }
        updatedLead = memoryLeads[idx];
      }
    }

    if (!updatedLead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    broadcastLeadUpdated(updatedLead);
    broadcastSSE('lead:updated', updatedLead);

    return res.json({ success: true, lead: updatedLead });
  } catch (err) {
    console.error('Error updating lead:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 4. Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDbStatus()) {
      await Lead.findByIdAndDelete(id);
    } else {
      memoryLeads = memoryLeads.filter((l) => l._id !== id);
    }

    broadcastLeadDeleted(id);
    broadcastSSE('lead:deleted', { id });

    return res.json({ success: true, message: 'Lead deleted', id });
  } catch (err) {
    console.error('Error deleting lead:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 5. Get Pipeline Metrics
exports.getStats = async (req, res) => {
  try {
    let allLeads = [];
    if (getDbStatus()) {
      allLeads = await Lead.find({}).lean();
    } else {
      allLeads = memoryLeads;
    }

    const totalLeads = allLeads.length;
    const newLeads = allLeads.filter((l) => l.status === 'New').length;
    const siteVisitsScheduled = allLeads.filter((l) => l.status === 'Site Visit Scheduled').length;
    const closedDeals = allLeads.filter((l) => l.status === 'Closed').length;

    return res.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        siteVisitsScheduled,
        closedDeals,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// 6. SSE Stream Endpoint
exports.streamLeads = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  res.write(`event: connected\ndata: ${JSON.stringify({ time: new Date() })}\n\n`);
  sseClients.add(res);

  const heartbeat = setInterval(() => {
    res.write(': ping\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
};
