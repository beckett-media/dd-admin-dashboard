const getData = (state) => state.pressPost;

export const getFilters = (state) => getData(state).filters;
export const getPagination = (state) => getData(state).pagination;

// export const getProductCreateLoading = (state) => getData(state).isProductCreateLoading;

export const getCurrentPressPostList = (state) => {
	const { page } = getPagination(state);
	const list = getData(state).list[page];
	return list || [];
};

export const getPressDeleteLoader = (state) => getData(state).isPressDeleteLoading;

// export const getSelectedProduct = (state) => getData(state).selectedProduct;

// export const getEditLoader = (state) => getData(state).isEditLoading;
