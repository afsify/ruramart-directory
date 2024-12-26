import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import database from "./config/database.js";
import userRouter from "./router/user.router.js";
import adminRouter from "./router/admin.router.js";
import brandRouter from "./router/brand.router.js";
import orderRouter from "./router/order.router.js";
import vendorRouter from "./router/vendor.router.js";
import productRouter from "./router/product.router.js";
import supportRouter from "./router/support.router.js";
import categoryRouter from "./router/category.router.js";
import subcategoryRouter from "./router/subcategory.router.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

database();

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/brand", brandRouter);
app.use("/api/order", orderRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/support", supportRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subcategoryRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is Running"));
