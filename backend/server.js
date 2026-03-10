import express from 'express';
import connectDatabase from './config/MongoDb.js';
import dotenv from "dotenv";
import ImportData from './DataImport.js';
import productRoute from './ProductRoutes.js';
import cors from 'cors';

dotenv.config();
connectDatabase();

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://bumpak.fr';
const app = express();

const allowedOrigins = [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5001'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/import", ImportData);
app.use("/api/products", productRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
