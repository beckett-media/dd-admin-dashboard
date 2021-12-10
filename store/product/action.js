import actionTypes from "./actionTypes";

export function getProductListings() {
	return { type: actionTypes.GET_PRODUCT_LISTINGS_REQUEST };
}

export function setProductListings(page, lists) {
	return { type: actionTypes.SET_PRODUCTS_LISTS, page, lists };
}

export function createNewProduct(product, isEdit) {
	return { type: actionTypes.ADD_NEW_PRODUCT_REQUEST, product, isEdit };
}

export function handleProductLoading(value) {
	return { type: actionTypes.TOOGLE_PRODUCT_CREATE_LOADER, value };
}

export function handleProductListLoading(value) {
	return { type: actionTypes.TOOGLE_PRODUCT_LIST_LOADER, value };
}

export function handleDeleteProductRequest(product) {
	return { type: actionTypes.HANDLE_DELETE_PRODUCT_REQUEST, product };
}

export function handleProductDeleteLoading(value) {
	return { type: actionTypes.HANDLE_PRODUCT_DELETE_LOADING, value };
}
export function handleProductEdit(product) {
	return { type: actionTypes.HANDLE_PRODUCT_EDIT, product };
}

export function handleProductEditRequest(productId) {
	return { type: actionTypes.HANDLE_PRODUCT_EDIT_REQUEST, productId };
}

export function handleEditLoading(value) {
	return { type: actionTypes.HANDLE_EDIT_LOADING, value };
}
export function handleProductImageDeleteRequest(value) {
	return { type: actionTypes.HANDLE_DELETE_PRODUCT_IMAGE_REQUEST, value };
}

export function handleProductCardDataRequest(cardId, cb) {
	return { type: actionTypes.HANDLE_CARD_DATA_REQUEST, cardId, cb };
}
