// import express from 'express';
// import connectDatabase from './config/MongoDb.js';
// import dotenv from "dotenv"
// import ImportData from './DataImport.js';
// import productRoute from './routes/ProductRoutes.js';
// import Product from "./models/ProductModel.js";


// dotenv.config();
// connectDatabase();
// const app = express();

  
// //API
// app.use("/api/import", ImportData);
// app.use("/api/products", productRoute)

// // CHARGER LES PRODUITS
// // app.get('/api/products', async (req, res) => {
// //   const { category, name } = req.query; // récupérer les valeurs des paramètres "category" et "name"
// //   const filter = {}; // initialiser le filtre avec un objet vide

// //   if (category) {
// //     filter.category = category; // si "category" est présent, ajouter le filtre par catégorie
// //   }

// //   if (name) {
// //     filter.name = name; // si "name" est présent, ajouter le filtre par nom
// //   }

// //   const products = await Product.find(filter);
// //   res.json(products);
// // });
// app.get('/api/products/:category/:productName', async (req, res) => {
//   const category = req.params.category;
//   const productName = req.params.productName;
//   const product = await Product.findOne({ category: category, name: productName }); // Use the Product model to find the product by category and name
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });
// app.get('/api/products/:slug', async (req, res) => {
//   const productSlug = req.params.slug;
//   const product = await Product.findOne({ slug: productSlug }); // Utilisez le modèle Product pour rechercher le produit par le slug
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product not found' });
//   }
// });


// // CHARGER UN PRODUIT
// // app.get('/api/products/:id', async (req, res) => {
// //   const productId = req.params.id;
// //   const product = await Product.findById(productId); // Use the Product model to find the product by ID
// //   if (product) {
// //     res.send(product);
// //   } else {
// //     res.status(404).send({ message: 'Product not found' });
// //   }
// // });

// // app.get('/api/products', async (req, res) => {
// //   const { category } = req.query; // récupérer la valeur du paramètre "category"
// //   const filter = category ? { category } : {}; // si "category" est présent, filtrer par catégorie, sinon renvoyer tous les produits
// //   const products = await Product.find(filter);
// //   res.json(products);
// // });


// app.listen(process.env.PORT, () => { console.log(`Server started on port ${process.env.PORT}`)})

import express from 'express';
import connectDatabase from './config/MongoDb.js';
import dotenv from "dotenv"
import ImportData from './DataImport.js';
import productRoute from './routes/ProductRoutes.js';
import Product from "./models/ProductModel.js";

dotenv.config(); // Initialisation de la configuration dotenv
connectDatabase(); // Connexion à la base de données MongoDB
const app = express(); // Initialisation de l'application Express

// MIDDLEWARES
app.use(express.json()); // Middleware pour traiter les données au format JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour traiter les données au format URL-encoded

// ROUTES
app.use("/api/import", ImportData); // Route pour importer les données de test
app.use("/api/products", productRoute); // Route pour les produits

// Récupération d'un produit par son slug
app.get('/api/products/:slug', async (req, res) => {
  try {
    const productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug }); // Utilisation du modèle Product pour rechercher le produit par le slug
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

// Lancement du serveur
app.listen(process.env.PORT, () => { console.log(`Server started on port ${process.env.PORT}`)});

