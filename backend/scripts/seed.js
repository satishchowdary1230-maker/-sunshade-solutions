require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const Lead = require('../src/models/Lead');
const { initialProducts } = require('../src/data/seedData');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log(`
======================================================================
  [Sunshade Solutions - Backend Seeder]
  Notice: MONGODB_URI is not set. The backend server automatically uses
  the built-in in-memory store with all 6 products & demo leads!
======================================================================
  `);
  process.exit(0);
}

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    console.log('Seeding products...');
    for (const prod of initialProducts) {
      await Product.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true, new: true });
      console.log(` ✓ Seeded: ${prod.title}`);
    }

    const count = await Lead.countDocuments();
    if (count === 0) {
      await Lead.create({
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
        notes: [{ text: 'Site engineer S.C. Sharma scheduled inspection on Thursday 11:00 AM.' }],
      });
      console.log(' ✓ Sample lead created.');
    }

    console.log('Backend database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
