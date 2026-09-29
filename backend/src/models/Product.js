const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
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
      fabricGsm: String,
      tensileStrength: String,
      windResistanceKmph: Number,
      steelGrade: String,
      lifespanYears: String,
      warranty: String,
      uvProtection: String,
      fireRating: String,
    },
    idealApplications: [String],
    priceRangePerSqFt: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    features: [String],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
