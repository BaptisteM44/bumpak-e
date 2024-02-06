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
// import axios from 'axios'; // Assurez-vous d'avoir axios installé pour faire la requête HTTP
// import connectDatabase from './config/MongoDb.js';
// import dotenv from "dotenv";
// import ImportData from './DataImport.js';
// import productRoute from './ProductRoutes.js';
// import Product from "./models/ProductModel.js";
// import { fileURLToPath } from 'url';
// import path from 'path';

// dotenv.config();
// connectDatabase();
// const app = express();

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

// app.use("/api/import", ImportData);
// app.use("/api/products", productRoute);

// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     const formattedProducts = products.map((product) => ({
//       id: product._id.toString(), // Assurez-vous d'utiliser `_id` pour MongoDB
//       price: product.price,
//       url: `https://bumpak.fr/${product.category}/${product.slug}` // Mettez à jour avec votre structure d'URL
//     }));
//     res.json(formattedProducts);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des produits:", error);
//     res.status(500).send({ message: 'Erreur serveur' });
//   }
// });

// app.post('/api/snipcart/webhooks', async (req, res) => {
//   const token = req.headers['x-snipcart-requestToken'];
  
//   if (!token) {
//     return res.status(401).send({ error: "No Snipcart token provided." });
//   }

//   try {
//     // Vérification du token auprès de Snipcart
//     const validationResponse = await axios.get(`https://app.snipcart.com/api/requestvalidation/${token}`);
//     if (validationResponse.status !== 200) {
//       return res.status(401).send({ error: "Invalid Snipcart token." });
//     }

//     const { items } = req.body;
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
//   const productSlug = req.params.slug;
//   const product = await Product.findOne({ slug: productSlug });
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server started on port ${process.env.PORT}`);
// });
