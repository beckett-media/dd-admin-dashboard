const getData = (state) => state.orders || {};

export const getOrders = (state) =>
  getData(state).orders.filter(
    (order) => order.address !== null && order.buyer !== null
  ) || {};

export const getSnapScoreOrders = (state) =>
  getData(state).orders.filter(
    (order) => order.address === null && order.buyer === null
  ) || {};
