const orders = [];

function getAllOrders() {
  return orders;
}

function findOrderById(id) {
  return orders.find((order) => order.id === id);
}

function addOrder(order) {
  orders.push(order);
}

function removeOrderById(id) {
  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    return false;
  }

  orders.splice(orderIndex, 1);
  return true;
}

module.exports = {
  getAllOrders,
  findOrderById,
  addOrder,
  removeOrderById,
};
