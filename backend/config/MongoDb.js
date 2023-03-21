import mongoose from 'mongoose';
import dotenv from "dotenv"


dotenv.config();
const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL , {
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