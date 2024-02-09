const { StatusCodes } = require('http-status-codes');
const { Order } = require('../models');

const orderController = {
  async createOrder(req, res) {
    try {
      const { fullName, email, phoneNumber, address, state, orderedProduct } = req.body;
      const order = await Order.create({ fullName, email, phoneNumber, address, state, orderedProduct });
      return res.status(StatusCodes.CREATED).json({
        success: true,
        data: order
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  },

  async getOrders(req, res) {
    try {
      const orders = await Order.find({});
      return res.status(StatusCodes.OK).json({
        success: true,
        data: orders
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  },

  async getOrderById(req, res) {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Order not found"
        });
      }
      return res.status(StatusCodes.OK).json({
        success: true,
        data: order
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  },

  async processOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Order not found"
        });
      }
      order.processing = true;
      await order.save();
      return res.status(StatusCodes.OK).json({
        success: true,
        data: order
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  },

  async completeOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Order not found"
        });
      }
      order.completed = true;
      await order.save();
      return res.status(StatusCodes.OK).json({
        success: true,
        data: order
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = orderController;
