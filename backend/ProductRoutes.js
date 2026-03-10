import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./models/ProductModel.js";

const productRoute = express.Router();

// GET /api/products?category=xxx  — liste des produits (filtrée par catégorie si besoin)
productRoute.get("/", asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  const products = await Product.find(filter);
  res.json(products);
}));

// GET /api/products/:slug  — détail d'un produit
productRoute.get("/:slug", asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    res.status(404).json({ message: "Produit non trouvé" });
    return;
  }

  const BASE_URL = process.env.BASE_URL || 'https://api.bumpak.fr';
  const doc = product.toObject();

  // Reconstruit les options depuis les anciens champs option1..option26 si le tableau est vide (legacy)
  let options = (doc.options || []).filter(o => o.name);
  if (options.length === 0) {
    for (let i = 1; i <= 30; i++) {
      const name = doc[`option${i}`];
      const price = parseFloat(doc[`option${i}price`]) || 0;
      if (name) options.push({ name, price });
    }
  }

  // Reconstruit les customFields depuis les anciens champs part1..part6 si le tableau est vide (legacy)
  let customFields = doc.customFields || [];
  if (customFields.length === 0) {
    for (let i = 1; i <= 6; i++) {
      const name = doc[`part${i}`];
      if (name) customFields.push({ name });
    }
  }

  res.json({
    ...doc,
    id: product._id.toString(),
    url: `${BASE_URL}/api/products/${product.slug}`,
    options,
    customFields,
  });
}));

export default productRoute;
