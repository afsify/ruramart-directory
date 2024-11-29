import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import database from "./config/database.js";
import userRouter from "./router/user.router.js";
import adminRouter from "./router/admin.router.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

database();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is Running"));
