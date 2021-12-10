const getData = (state) => state.store;

export const getFilters = (state) => getData(state).filters;
export const getPagination = (state) => getData(state).pagination;

export const getProductCreateLoading = (state) =>
  getData(state).isProductCreateLoading;

export const getCurrentProductList = (state) => {
  const { page } = getPagination(state);
  const list = getData(state).stores[page];
  return list || [];
};

export const getUnclaimedStores = (state) => {
  const { page } = getPagination(state);
  const list = getData(state).unclaimedStores[page];
  return list || [];
};

export const getProductDeleteLoader = (state) =>
  getData(state).isProductDeleteLoading;

export const getStoreEditLoader = (state) => getData(state).isEditLoading;

export const getSelectedStore = (state) => getData(state).selectedStore;
