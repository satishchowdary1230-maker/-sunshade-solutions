import mongoose, { Schema, Document, Model } from 'mongoose';

export type LeadStatus = 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Closed';

export interface ILeadNote {
  text: string;
  createdAt: Date;
}

export interface ILead extends Document {
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
  notes: ILeadNote[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadNoteSchema = new Schema<ILeadNote>({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const LeadSchema = new Schema<ILead>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
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
      min: [50, 'Minimum structure area is 50 sq ft'],
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

// Prevent re-compilation of model in development
const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
