const getData = (state) => state.storeProduct;

export const getFilters = (state) => getData(state).filters;
export const getPagination = (state) => getData(state).pagination;

export const getProductCreateLoading = (state) =>
  getData(state).isProductCreateLoading;

export const getSelectedStoreProductList = (state) => {
  const { page } = getPagination(state);
  const list = getData(state).storeProducts[page];
  return list || [];
};

export const getProductDeleteLoader = (state) =>
  getData(state).isProductDeleteLoading;

export const getSelectedProduct = (state) => getData(state).selectedStoreProduct;

export const getEditLoader = (state) => getData(state).isEditLoading;
