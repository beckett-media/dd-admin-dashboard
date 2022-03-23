const getData = (state) => state.coupon;

export const getFilters = (state) => getData(state).filters;
export const getPagination = (state) => getData(state).pagination;

export const getCurrentCouponList = (state) => {
  const { page } = getPagination(state);
  const list = getData(state).list[page];
  return list || [];
};

export const getCouponDeleteLoader = (state) =>
  getData(state).isCouponDeleteLoading;
