import * as orderService from "../services/orderService.js";

export const getOrders = async (
  req,
  res,
  next
) => {
  try {
    const orders = await orderService.listByTenant(
      req.tenantId
    );

    res.json({
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req,
  res,
  next
) => {
  try {
    const order = await orderService.create(
      req.tenantId,
      req.user._id,
      req.body
    );

    res.status(201).json({
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req,
  res,
  next
) => {
  try {
    const order = await orderService.updateStatus(
      req.tenantId,
      req.params.id,
      req.body.status
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      order,
    });
  } catch (error) {
    next(error);
  }
};