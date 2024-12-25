import express from "express";
const wishlistRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listWishlist,
  getWishlist,
  createWishlist,
  updateWishlist,
  toggleWishlist,
} from "../controller/wishlist.controller.js";

//? ============================================= Wishlist CRUD =============================================

wishlistRouter.get("/list-wishlist", listWishlist);
wishlistRouter.get("/get-wishlist/:slug", getWishlist);
wishlistRouter.post("/create-wishlist", createWishlist);
wishlistRouter.put("/update-wishlist/:id", updateWishlist);
wishlistRouter.put("/toggle-wishlist/:id", toggleWishlist);

export default wishlistRouter;
