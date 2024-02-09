const express = require("express");
const router = express.Router();
const { orderController } = require('../controllers');
const asyncHandler = require("express-async-handler");

// Order routes
router.post("/orders", asyncHandler(orderController.createOrder));
router.get("/orders", asyncHandler(orderController.getOrders));
router.get("/orders/:orderId", asyncHandler(orderController.getOrderById));
router.put("/orders/:orderId/process", asyncHandler(orderController.processOrder));
router.put("/orders/:orderId/complete", asyncHandler(orderController.completeOrder));

module.exports = router;
