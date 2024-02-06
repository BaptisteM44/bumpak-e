import express from "express";
import asyncHandler from "express-async-handler"
import Product from "./models/ProductModel.js";

const productRoute = express.Router()

productRoute.get("/", asyncHandler(
    async(req, res) => {
        const products = await Product.find({});
        res.json(products)
    })
);

// router.get('/api/products-json', async (req, res) => {
//     try {
//       const products = await Product.find({});
//       const productsForSnipcart = products.map(product => ({
//         id: product._id.toString(),
//         price: product.price,
//         url: `https://bumpak.fr/${product.category}/${product.slug}` // Modifiez cette ligne pour correspondre à l'URL réelle de votre produit
//       }));
  
//       res.json(productsForSnipcart);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des produits: ", error);
//       res.status(500).send("Erreur serveur");
//     }
//   });

export default productRoute;