// import express from "express"
// import Product from "./models/ProductModel.js"
// import asyncHandler from "express-async-handler"
// const ImportData = express.Router();
 
// ImportData.post("/products", async (req, res) => {
//     await Product.remove({});
//     const importProducts = await Product.insertMany(products);
//     res.send({ importProducts });
// });

// export default ImportData;
import express from "express"
import Product from './models/ProductModel.js'
const ImportData = express.Router();
 
ImportData.post("/products", async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
});

// Exporter votre routeur Express comme une fonction sans serveur
export default (req, res) => {
  return ImportData(req, res);
};
