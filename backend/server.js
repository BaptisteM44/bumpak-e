// import express from 'express';
// import http from 'http';
// import connectDatabase from './config/MongoDb.js';
// import dotenv from "dotenv";
// import ImportData from './DataImport.js';
// import productRoute from './ProductRoutes.js';
// import Product from "./models/ProductModel.js";
// import path from 'path';
// import { fileURLToPath } from 'url'; // Importez cela pour gérer correctement les chemins

// dotenv.config();
// connectDatabase();
// const app = express();

// // Pour gérer correctement les chemins en ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// // Vos routes API
// app.use("/api/import", ImportData);
// app.use("/api/products", productRoute);

// app.post('/api/snipcart/webhooks', async (req, res) => {
//   const { items } = req.body;

//   try {
//     for (const item of items) {
//       const dbProduct = await Product.findById(item.id);
//       if (!dbProduct) {
//         return res.status(400).send({ error: "Product not found." });
//       }
      
//       const snipcartPrice = parseFloat(item.price);
//       const dbPrice = parseFloat(dbProduct.price);

//       if (dbPrice !== snipcartPrice) {
//         return res.status(400).send({ error: "Price mismatch." });
//       }
//     }

//     res.send({ valid: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Server error during validation." });
//   }
// });
 
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
import express from 'express';
import fetch from 'node-fetch'; // Assurez-vous d'avoir 'node-fetch' installé pour cela
import http from 'http';
import connectDatabase from './config/MongoDb.js';
import dotenv from "dotenv";
import ImportData from './DataImport.js';
import productRoute from './ProductRoutes.js';
import Product from "./models/ProductModel.js";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDatabase();
const app = express();

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

app.use("/api/import", ImportData);
app.use("/api/products", productRoute);

app.post('/api/snipcart/webhooks', async (req, res) => {
  const requestToken = req.headers['x-snipcart-requesttoken'];
  const secretApiKey = 'ZjlmMmIzN2QtNmRlMS00Y2FjLTlkMWUtNDY2NmM1OWVkODk3NjM4NDE3MDEyNjEwNjYyNDg3' ; // Remplacez par votre clé API secrète de Snipcart

  try {
    const validationResponse = await fetch('https://app.snipcart.com/api/requestvalidation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secretApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: requestToken })
    });

    if (!validationResponse.ok) {
      throw new Error('Failed to validate Snipcart webhook');
    }

    // Webhook validation succeeded, proceed with processing
    const { items } = req.body;
    for (const item of items) {
      const dbProduct = await Product.findById(item.id);
      if (!dbProduct || parseFloat(dbProduct.price) !== parseFloat(item.price)) {
        return res.status(400).send({ error: "Validation failed for one or more products." });
      }
    }

    res.send({ valid: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error during Snipcart webhook validation." });
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
