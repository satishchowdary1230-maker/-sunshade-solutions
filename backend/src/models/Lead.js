const mongoose = require('mongoose');

const LeadNoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LeadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    city: {
      type: String,
      default: 'Hyderabad',
      trim: true,
    },
    structureType: {
      type: String,
      required: [true, 'Structure type is required'],
    },
    fabricMaterial: {
      type: String,
      required: [true, 'Fabric/material specification is required'],
    },
    estimatedArea: {
      type: Number,
      required: [true, 'Estimated area in Sq. Ft. is required'],
      min: 50,
    },
    projectBudgetBracket: {
      type: String,
      required: [true, 'Calculated budget bracket is required'],
    },
    siteVisitRequested: {
      type: Boolean,
      default: true,
    },
    addressOrSiteLocation: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Site Visit Scheduled', 'Closed'],
      default: 'New',
    },
    notes: [LeadNoteSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
