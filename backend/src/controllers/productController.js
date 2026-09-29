const Product = require('../models/Product');
const { getDbStatus } = require('../config/db');
const { initialProducts } = require('../data/seedData');

exports.getProducts = async (req, res) => {
  try {
    if (getDbStatus()) {
      let products = await Product.find({}).sort({ createdAt: -1 }).lean();
      if (products.length === 0) {
        await Product.insertMany(initialProducts);
        products = await Product.find({}).sort({ createdAt: -1 }).lean();
      }
      return res.json({ success: true, count: products.length, products });
    }

    // Memory Store
    return res.json({ success: true, count: initialProducts.length, products: initialProducts });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (getDbStatus()) {
      const product = await Product.findOne({ slug }).lean();
      if (product) return res.json({ success: true, product });
    }

    const found = initialProducts.find((p) => p.slug === slug);
    if (found) return res.json({ success: true, product: found });

    return res.status(404).json({ success: false, error: 'Product not found' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
