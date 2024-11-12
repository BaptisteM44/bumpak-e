import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./models/ProductModel.js";

const productRoute = express.Router();

productRoute.get("/", asyncHandler(
    async (req, res) => {
        const products = await Product.find({});
        res.json(products);
    })
);
productRoute.get("/:slug", asyncHandler(
  async (req, res) => {
    const productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug });
    
    // Vérifier les données récupérées depuis MongoDB
    console.log("Produit récupéré depuis MongoDB:", product);
    
    if (product) {
      const responseData = {
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
        subcategory: product.subcategory,
        slug: product.slug,
        url: `https://bumpak-e-production.up.railway.app/api/products/${product.slug}`,
      };

      // Vérifier les données envoyées au frontend
      console.log("Données envoyées au frontend:", responseData);

      res.json(responseData);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
));
export default productRoute;
