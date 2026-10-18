const express = require("express");
const {
  getOrders,
  getOrderById,
  createOrderHandler,
  deleteOrder,
} = require("../controllers/orders.controller.js");

const router = express.Router();

router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.post("/orders", createOrderHandler);
router.delete("/orders/:id", deleteOrder);

module.exports = router;
