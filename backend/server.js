import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import { createProxyMiddleware } from "http-proxy-middleware";

const port = process.env.PORT || 5000;
dotenv.config();

connectDB(); // connect to database

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));