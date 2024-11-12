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
  const allowedOrigins = ['https://bumpak.fr', 'http://localhost:5001'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/import", ImportData);
app.use("/api/products", productRoute); // Assurez-vous que ceci vient avant votre route personnalisée


// app.get('/api/products/:slug', async (req, res) => {
//   try {
//     const productSlug = req.params.slug;
//     const product = await Product.findOne({ slug: productSlug });
//     if (product) {
//       res.json({
//         id: product._id.toString(),
//         name: product.name,
//         price: product.price,
//         description: product.description,
//         image: product.image,
//         category: product.category,
//         subcategory: product.subcategory,
//         features: product.features,
//         url: `https://bumpak-e-production.up.railway.app/api/products/${product.slug}`, // Inclure l'URL ici
//         additionalImages: [product.image1, product.image2, product.image3],
//         options: [
//           { name: "Option1", value: product.option1, price: product.option1price },
//           { name: "Option2", value: product.option2, price: product.option2price },
//           // Ajoutez d'autres options si nécessaire
//         ],
//         customFields: [
//           { name: "Part1", value: product.part1 },
//           { name: "Part2", value: product.part2 },
//           // Continuez avec d'autres parties spécifiques du produit si nécessaire
//         ]
//       });
//     } else {
//       res.status(404).send({ message: 'Product not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
//   }
// });

app.get('/api/products/:slug', async (req, res) => {
  try {
    const productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug });
    if (product) {
      const productObject = product.toObject(); // Convertit le document Mongoose en objet simple
      // Personnalisez la réponse en ajoutant ou modifiant les champs nécessaires
      res.json({
        id: product.id.toString(), // Assurez-vous que l'ID est sous forme de string
        price: product.price,
        ...productObject, // Inclut tous les champs de l'objet produit
        features: product.features,
        url: `https://bumpak-e-production.up.railway.app/api/products/${product.slug}`, // Inclure l'URL ici
        additionalImages: [product.image1, product.image2, product.image3],
        options: [
          { name: "Option1", value: product.option1, price: product.option1price },
          { name: "Option2", value: product.option2, price: product.option2price },
          { name: "Option3", value: product.option3, price: product.option3price },
          { name: "Option4", value: product.option4, price: product.option4price },
          { name: "Option5", value: product.option5, price: product.option5price },
          { name: "Option6", value: product.option6, price: product.option6price },


          // Ajoutez d'autres options si nécessaire
        ],
        customFields: [
          { name: "Part1", value: product.part1 },
          { name: "Part2", value: product.part2 },
          { name: "Part3", value: product.part3 },
          { name: "Part4", value: product.part4 },
          { name: "Part5", value: product.part5 },
          { name: "Part6", value: product.part6 },
          // Continuez avec d'autres parties spécifiques du produit si nécessaire
        ]

        // Ajoutez ou remplacez d'autres champs si nécessaire
      });
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