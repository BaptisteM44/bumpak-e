import express from 'express';
import http from 'http';
import connectDatabase from './config/MongoDb.js';
import dotenv from "dotenv";
import ImportData from './DataImport.js';
import productRoute from './ProductRoutes.js';
import Product from "./models/ProductModel.js";
import path from 'path';
import { fileURLToPath } from 'url'; // Importez cela pour gérer correctement les chemins

dotenv.config();
connectDatabase();
const app = express();

// Pour gérer correctement les chemins en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Vos routes API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);

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
 
app.get('/api/products/:slug', async (req, res) => {
  try {
    const productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});


// import express from 'express';
// import http from 'http';
// import connectDatabase from './config/MongoDb.js';
// import dotenv from "dotenv";
// import ImportData from './DataImport.js';
// import productRoute from './ProductRoutes.js';
// import Product from "./models/ProductModel.js";
// import path from 'path';
// import { fileURLToPath } from 'url';

// dotenv.config();
// connectDatabase();
// const app = express();

// // Pour gérer correctement les chemins en ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(productsJsonRoute);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// // Vos routes API
// app.use("/api/import", ImportData);
// app.use("/api/products", productRoute);

// // Route pour le webhook de validation Snipcart
// app.post('/api/snipcart/webhooks', async (req, res) => {
//   try {
//     // Supposons que votre corps de requête contient des articles sous "items"
//     for (const item of req.body.items) {
//       const dbProduct = await Product.findById(item.id);
//       if (!dbProduct) {
//         return res.status(400).send({ error: "Product not found." });
//       }
      
//       // Convertir les prix en nombre pour la comparaison
//       const snipcartPrice = parseFloat(item.price);
//       const dbPrice = parseFloat(dbProduct.price);

//       if (dbPrice !== snipcartPrice) {
//         return res.status(400).send({ error: "Price mismatch." });
//       }
//     }

//     // Si tout est valide
//     res.send({ valid: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Server error during validation." });
//   }
// });

// // Route pour récupérer un produit par son slug
// app.get('/api/products/:slug', async (req, res) => {
//   try {
//     const productSlug = req.params.slug;
//     const product = await Product.findOne({ slug: productSlug });
//     if (product) {
//       res.send(product);
//     } else {
//       res.status(404).send({ message: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server started on port ${process.env.PORT}`);
// });
