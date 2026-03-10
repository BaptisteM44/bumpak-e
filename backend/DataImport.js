import express from "express";
import Product from './models/ProductModel.js';

const ImportData = express.Router();

ImportData.post("/products", async (req, res) => {
  try {
    const products = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Le body doit être un tableau de produits non vide." });
    }
    await Product.deleteMany({});
    const importedProducts = await Product.insertMany(products);
    res.json({ count: importedProducts.length, products: importedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'import", error: error.message });
  }
});

export default ImportData;
