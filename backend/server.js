// import express from 'express';
// import http from 'http';
// import connectDatabase from './config/MongoDb.js'
// import dotenv from "dotenv"
// import ImportData from './DataImport.js';
// import productRoute from './ProductRoutes.js';
// import Product from "./models/ProductModel.js";
// import path from 'path';

// dotenv.config(); // Initialisation de la configuration dotenv
// connectDatabase(); // Connexion à la base de données MongoDB
// const app = express(); // Initialisation de l'application Express

// // MIDDLEWARES
// app.use(express.json()); // Middleware pour traiter les données au format JSON
// app.use(express.urlencoded({ extended: true })); // Middleware pour traiter les données au format URL-encoded

// // Middleware pour gérer les en-têtes CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
// // ROUTES
// app.use("/api/import", ImportData); // Route pour importer les données de test
// app.use("/api/products/", productRoute); // Route pour les produits

// // Route pour le webhook de validation Snipcart
// app.post('/api/snipcart/webhook', async (req, res) => {
//   const { items } = req.body;

//   try {
//       // Itérer sur chaque produit dans la commande
//       for (const item of items) {
//           const dbProduct = await Product.findById(item.id); // Trouvez le produit dans la base de données
//           // Valider le produit (par exemple, vérifier le prix)
//           if (!dbProduct || dbProduct.price !== item.price) {
//               // Si la validation échoue, envoyer une réponse d'erreur
//               return res.status(400).send({ error: "Validation failed for one or more products." });
//           }
//       }

//       // Si tous les produits sont validés, envoyer une réponse de succès
//       res.send({ valid: true });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Server error during validation." });
//   }
// });



// // Récupération d'un produit par son slug
// app.get('/api/products/:slug', async (req, res) => {
//   try {
//     const productSlug = req.params.slug;
//     const product = await Product.findOne({ slug: productSlug }); // Utilisation du modèle Product pour rechercher le produit par le slug
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
// // Lancement du serveur
// app.listen(process.env.PORT, () => { console.log(`Server started on port ${process.env.PORT}`)});

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
//       const dbProduct = await Product.findById(item.id); // Supposons que cela récupère le produit de votre base de données
//       if (!dbProduct) {
//         return res.status(400).send({ error: "Product not found." });
//       }
      
//       // Convertir le prix Snipcart et le prix de la base de données en nombre pour la comparaison
//       const snipcartPrice = parseFloat(item.price); // Prix de l'article envoyé par Snipcart
//       const dbPrice = parseFloat(dbProduct.price); // Prix de votre base de données, converti en nombre

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
// Importations nécessaires
import express from 'express';
import connectDatabase from './config/MongoDb.js';
import dotenv from "dotenv";
import ImportData from './DataImport.js';
import productRoute from './ProductRoutes.js';
import Product from "./models/ProductModel.js";

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Vos routes API existantes
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);

// Route pour le webhook de validation Snipcart
app.post('/api/snipcart/webhooks', async (req, res) => {
  const { items } = req.body;

  try {
    for (const item of items) {
      const dbProduct = await Product.findById(item.id); // Supposons que cela récupère le produit de votre base de données
      if (!dbProduct) {
        return res.status(400).send({ error: "Product not found." });
      }
      
      // Convertir le prix Snipcart et le prix de la base de données en nombre pour la comparaison
      const snipcartPrice = parseFloat(item.price); // Prix de l'article envoyé par Snipcart
      const dbPrice = parseFloat(dbProduct.price); // Prix de votre base de données, converti en nombre

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
// Nouvelle route pour servir les données du produit en JSON pour Snipcart
app.get('/api/products/:slug/json', async (req, res) => {
  const slug = req.params.slug;
  
  try {
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    
    // Réponse JSON spécifique pour Snipcart
    res.json({
      id: product.id.toString(),
      price: product.price,
      url: `https://bumpak.fr/api/products/${slug}/json`
    });
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// Lancement du serveur
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
