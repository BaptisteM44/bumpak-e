import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true
  },
  price:{
    type: Number,
    require: true
  },
  image:{
      type: String,
      require: true,
  },
  category:{
    type: String,
    require: true
  },
  subcategory:{
    type: String,
    require: true
  },
  slug:{
    type: String,
    require: true
  },

})

const Product = mongoose.model('Product', productSchema);

export default Product;