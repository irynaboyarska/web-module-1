const {
  getAllOrders,
  findOrderById,
  addOrder,
  removeOrderById,
} = require("../store/orders-store.js");
const {
  validateCreateOrder,
  createOrder,
  orderResponse,
} = require("../services/orders.service.js");
const {
  validationProblem,
  notFoundProblem,
} = require("../utils/api-errors.js");

function getOrders(req, res) {
  const result = getAllOrders().map((order) => orderResponse(order));

  return res.status(200).json({
    orders: result,
    count: result.length,
  });
}

function getOrderById(req, res) {
  const matchingOrder = findOrderById(req.params.id);

  if (!matchingOrder) {
    return res.status(404).json(notFoundProblem());
  }

  return res.status(200).json(orderResponse(matchingOrder));
}

function createOrderHandler(req, res, next) {
  try {
    const validationErrors = validateCreateOrder(req.body);

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json(validationProblem("Invalid order", validationErrors));
    }

    const newOrder = createOrder(req.body.customerName, req.body.items);

    addOrder(newOrder);

    return res
      .status(201)
      .location(`/orders/${newOrder.id}`)
      .json(orderResponse(newOrder));
  } catch (error) {
    return next(error);
  }
}

function deleteOrder(req, res) {
  const removed = removeOrderById(req.params.id);

  if (!removed) {
    return res.status(404).json(notFoundProblem());
  }

  return res.status(204).send();
}

module.exports = {
  getOrders,
  getOrderById,
  createOrderHandler,
  deleteOrder,
};
