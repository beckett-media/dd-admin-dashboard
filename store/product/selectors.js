const getData = (state) => state.product;

export const getFilters = (state) => getData(state).filters;
export const getPagination = (state) => getData(state).pagination;

export const getProductCreateLoading = (state) => getData(state).isProductCreateLoading;

export const getCurrentProductList = (state) => {
	const { page } = getPagination(state);
	const list = getData(state).lists[page];
	return list || [];
};

export const getProductDeleteLoader = (state) => getData(state).isProductDeleteLoading;

export const getSelectedProduct = (state) => getData(state).selectedProduct;

export const getEditLoader = (state) => getData(state).isEditLoading;
