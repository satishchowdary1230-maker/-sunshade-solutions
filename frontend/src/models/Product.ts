import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITechnicalSpecs {
  fabricGsm?: string;
  tensileStrength?: string;
  windResistanceKmph?: number;
  steelGrade?: string;
  lifespanYears?: string;
  warranty?: string;
  uvProtection?: string;
  fireRating?: string;
}

export interface IProduct extends Document {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technicalSpecs: ITechnicalSpecs;
  idealApplications: string[];
  priceRangePerSqFt: {
    min: number;
    max: number;
  };
  imageUrl: string;
  features: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    technicalSpecs: {
      fabricGsm: { type: String },
      tensileStrength: { type: String },
      windResistanceKmph: { type: Number },
      steelGrade: { type: String },
      lifespanYears: { type: String },
      warranty: { type: String },
      uvProtection: { type: String },
      fireRating: { type: String },
    },
    idealApplications: [{ type: String }],
    priceRangePerSqFt: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    features: [{ type: String }],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
