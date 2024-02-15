import express from 'express';
import http from 'http';
import connectDatabase from './config/MongoDb.js';
import dotenv from "dotenv";
import ImportData from './DataImport.js';
import productRoute from './ProductRoutes.js';
import Product from "./models/ProductModel.js";
import path from 'path';
import { fileURLToPath } from 'url'; // Importez cela pour gérer correctement les chemins
import cors from 'cors';

dotenv.config();
connectDatabase();
const app = express();

// Pour gérer correctement les chemins en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/import", ImportData);
app.use("/api/products", productRoute); // Assurez-vous que ceci vient avant votre route personnalisée

// Ajoutez la route /api/products-json ici
// Route pour obtenir les détails d'un produit spécifique en JSON
app.get('/api/products/:slug', async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug: slug });
  if (product) {
    // Format attendu par Snipcart
    res.json({
      id: product._id.toString(),
      price: product.price,
      url: `https://bumpak-e-production.up.railway.app/api/products/${product.slug}`,
      name: product.name,
      // Ajoutez ici d'autres champs si nécessaire
    });
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.post('/api/snipcart/webhooks', async (req, res) => {
  const { items } = req.body;

  try {
    for (const item of items) {
      const dbProduct = await Product.findById(item.id);
      if (!dbProduct) {
        return res.status(400).send({ error: "Product not found." });
      }
      
      const snipcartPrice = parseFloat(item.price);
      const dbPrice = parseFloat(dbProduct.price);

      if (dbPrice !== snipcartPrice) {
        return res.status(400).send({ error: "Price mismatch." });
      }
    }

    res.send({ valid: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error during validation." });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});