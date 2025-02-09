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
          { name: "Option7", value: product.option7, price: product.option7price },
          { name: "Option8", value: product.option8, price: product.option8price },
          { name: "Option9", value: product.option9, price: product.option9price },
          { name: "Option10", value: product.option10, price: product.option10price },
          { name: "Option11", value: product.option11, price: product.option11price },
          { name: "Option12", value: product.option12, price: product.option12price },
          { name: "Option13", value: product.option13, price: product.option13price },
          { name: "Option14", value: product.option14, price: product.option14price },
          { name: "Option15", value: product.option15, price: product.option15price },
          { name: "Option16", value: product.option16, price: product.option16price },
          { name: "Option17", value: product.option17, price: product.option17price },
          { name: "Option18", value: product.option18, price: product.option18price },
          { name: "Option19", value: product.option19, price: product.option19price },
          { name: "Option20", value: product.option20, price: product.option20price },
          { name: "Option21", value: product.option21, price: product.option21price },
          { name: "Option22", value: product.option22, price: product.option22price },
          { name: "Option23", value: product.option23, price: product.option23price },
          { name: "Option24", value: product.option24, price: product.option24price },
          { name: "Option25", value: product.option25, price: product.option25price },
          { name: "Option26", value: product.option26, price: product.option26price },


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