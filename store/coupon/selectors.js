const getData = (state) => state.coupon;

export const getFilters = (state) => getData(state).filters;
export const getPagination = (state) => {
  console.log(getData(state));
  getData(state).pagination;
};

// export const getProductCreateLoading = (state) => getData(state).isProductCreateLoading;

export const getCurrentCouponList = (state) => {
//   const  pagination  = getPagination(state);
  const list = getData(state).list[getData.pagination.page];
  return list || [];
};

export const getCouponDeleteLoader = (state) =>
  getData(state).isCouponDeleteLoading;

// export const getSelectedProduct = (state) => getData(state).selectedProduct;

// export const getEditLoader = (state) => getData(state).isEditLoading;
