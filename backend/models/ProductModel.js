import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  name: String,
  price: { type: Number, default: 0 },
}, { _id: false });

const customPartSchema = new mongoose.Schema({
  name: String,
}, { _id: false });

const productSchema = new mongoose.Schema({
  // Identité
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subcategory: { type: String },

  // Prix et descriptions
  price: { type: Number, required: true },
  description: { type: String },
  descriptionfr: { type: String },
  features: { type: String },

  // Images (thumbnail + jusqu'à 9 photos)
  image: { type: String },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  image5: { type: String },
  image6: { type: String },
  image7: { type: String },
  image8: { type: String },
  image9: { type: String },

  // SVG de personnalisation (contenu SVG brut)
  svg: { type: String },

  // Parties colorisables du produit (ex: "product-shape1")
  part1: { type: String },
  part2: { type: String },
  part3: { type: String },
  part4: { type: String },
  part5: { type: String },
  part6: { type: String },

  // Cordes élastiques colorisables
  elastic1: { type: String },
  elastic2: { type: String },
  elastic3: { type: String },

  // Options produit (taille, volume, variantes...) avec prix additionnels
  options: { type: [optionSchema] },

  // Parties personnalisables affichées dans le configurateur
  customFields: { type: [customPartSchema], default: [] },
}, {
  timestamps: true,
  // Permet les champs non définis qui pourraient exister en DB (legacy)
  strict: false,
});

productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
