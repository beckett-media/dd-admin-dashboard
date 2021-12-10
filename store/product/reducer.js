import actionTypes from "./actionTypes";

export const initState = {
	lists: {},
	isListLoading: true,
	filters: {},
	pagination: { page: 1, perPage: 100 },
	isProductCreateLoading: false,
	gradesList: [],
	isProductDeleteLoading: false,
	selectedProduct: null,
	isEditLoading: false,
};

function reducer(state = initState, action) {
	switch (action.type) {
		case actionTypes.TOOGLE_PRODUCT_CREATE_LOADER:
			return {
				...state,
				isProductCreateLoading: action.value,
			};
		case actionTypes.TOOGLE_PRODUCT_LIST_LOADER:
			return {
				...state,
				isListLoading: action.value,
			};

		case actionTypes.SET_PRODUCTS_LISTS:
			return {
				...state,
				lists: {
					...state.lists,
					[action.page]: action.lists,
				},
			};

		case actionTypes.HANDLE_PRODUCT_DELETE_LOADING:
			return {
				...state,
				isListLoading: action.value,
			};

		case actionTypes.HANDLE_PRODUCT_EDIT:
			return {
				...state,
				selectedProduct: action.product,
			};
		case actionTypes.HANDLE_EDIT_LOADING:
			return {
				...state,
				isEditLoading: action.value,
			};

		default:
			return state;
	}
}

export default reducer;
