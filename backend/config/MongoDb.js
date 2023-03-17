import mongoose from 'mongoose';
import dotenv from "dotenv"


dotenv.config();
const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://Baptiste:OH7qM6ILbipnuyYM@cluster0.gsgvfoj.mongodb.net/Bumpak-ecommerce?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongo Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connectDatabase;