import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import { connectDB } from "./config/connectDB.js";
import { userRouter } from "./router/user.router.js";
import { adminRouter } from "./router/admin.router.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is Running"));
