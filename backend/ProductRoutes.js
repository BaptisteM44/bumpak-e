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
      const product = await Product.findOne({ slug: req.params.slug });
      if (product) {
        res.json({
          id: product._id.toString(), // Assurez-vous que l'ID est formaté en `id` pour Snipcart
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
          subcategory: product.subcategory,
          slug: product.slug,
          url: `https://bumpak-e-production.up.railway.app/api/products/${product.slug}`, // URL pour Snipcart
        });
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    })
  );
export default productRoute;
