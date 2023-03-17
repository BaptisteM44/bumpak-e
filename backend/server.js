import express from 'express';
import connectDatabase from './config/MongoDb.js';
import dotenv from "dotenv"
import ImportData from './DataImport.js';
import productRoute from './routes/ProductRoutes.js';
import Product from "./models/ProductModel.js";


dotenv.config();
connectDatabase();
const app = express();

  
//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute)

// CHARGER LES PRODUITS
// app.get("/api/products", (req, res) => {
//     res.json(products)
// });

// CHARGER UN PRODUIT
app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId); // Use the Product model to find the product by ID
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products', async (req, res) => {
  const { category } = req.query; // récupérer la valeur du paramètre "category"
  const filter = category ? { category } : {}; // si "category" est présent, filtrer par catégorie, sinon renvoyer tous les produits
  const products = await Product.find(filter);
  res.json(products);
});


app.listen(process.env.PORT, () => { console.log(`Server started on port ${process.env.PORT}`)})

