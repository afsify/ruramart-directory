import express from "express";
const reviewRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listReview,
  getReview,
  createReview,
  updateReview,
  toggleReview,
} from "../controller/review.controller.js";

//? ============================================= Review CRUD =============================================

reviewRouter.get("/list-review", listReview);
reviewRouter.get("/get-review/:id", getReview);
reviewRouter.post("/create-review", createReview);
reviewRouter.put("/update-review/:id", updateReview);
reviewRouter.put("/toggle-review/:id", toggleReview);

export default reviewRouter;
