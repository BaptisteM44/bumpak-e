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

app.get('/api/products/:slug', async (req, res) => {
  try {
    const productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug });
    if (product) {
      // Structure de réponse adaptée à Snipcart
      res.json({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        url: `https://bumpak-e-production.up.railway.app/api/products/${product.slug}`,
        description: product.description,
        image: product.image,
        category: product.category,
        subcategory: product.subcategory,
        features: product.features,
        image: product.image,
        // Images supplémentaires
        additionalImages: [product.image1, product.image2, product.image3],
        // Options et prix des options
        options: [
          { name: "Option1", value: product.option1, price: product.option1price },
          { name: "Option2", value: product.option2, price: product.option2price },
          // Ajoutez plus d'options ici
        ],
        // Champs personnalisés pour les caractéristiques spécifiques du produit
        customFields: [
          { name: "Part1", value: product.part1 },
          { name: "Part2", value: product.part2 },
          // Continuez avec les autres parties spécifiques du produit
        ],
        // Ajoutez d'autres champs nécessaires ici
      });
      
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
// app.get('/api/products/:slug', async (req, res) => {
//   try {
//     const productSlug = req.params.slug;
//     const product = await Product.findOne({ slug: productSlug });
//     if (product) {
//       const productObject = product.toObject(); // Convertit le document Mongoose en objet simple
//       // Personnalisez la réponse en ajoutant ou modifiant les champs nécessaires
//       res.json({
//         id: product._id.toString(), // Assurez-vous que l'ID est sous forme de string
//         price: product.price,
//         ...productObject, // Inclut tous les champs de l'objet produit
//         url: `https://bumpak-e-production.up.railway.app/api/products/${product.slug}`, // URL personnalisée
//         // Ajoutez ou remplacez d'autres champs si nécessaire
//       });
//     } else {
//       res.status(404).send({ message: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

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