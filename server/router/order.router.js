import express from "express";
const orderRouter = express.Router();
import { authorize, protect } from "../middleware/auth.js";
import {
  listOrder,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  handleOrderReturn,
  handleOrderCancellation,
  handleOrderReturnStatus,
} from "../controller/order.controller.js";

//? ============================================= Order CRUD =============================================

orderRouter.get("/list-order", listOrder);
orderRouter.get("/get-order/:id", getOrder);
orderRouter.post("/create-order", createOrder);
orderRouter.put("/update-order/:id", updateOrder);
orderRouter.delete("/delete-order/:id", deleteOrder);

//? ============================================= Order Status =============================================

orderRouter.patch("/order-status/:id", updateOrderStatus);
orderRouter.patch("/order-cancel/:id", handleOrderCancellation);
orderRouter.patch("/order-return/:id", handleOrderReturn);
orderRouter.patch("/return-status/:id", handleOrderReturnStatus);

export default orderRouter;
