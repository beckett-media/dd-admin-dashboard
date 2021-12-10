import actionTypes from "./actionTypes";

export function getSelectedStoreProducts(storeId) {
  return { type: actionTypes.GET_STORE_PRODUCTS_OF_USER_REQUEST, storeId };
}

export function setStoresProducts(page, lists) {
  return { type: actionTypes.SET_STORES_PRODUCTS, page, lists };
}

export function createNewStoreProduct(store, storeId, isEdit) {
  return { type: actionTypes.ADD_NEW_STORE_PRODUCT_REQUEST, store, storeId, isEdit };
}

export function handleProductLoading(value) {
  return { type: actionTypes.TOOGLE_PRODUCT_CREATE_LOADER, value };
}

export function handleProductListLoading(value) {
  return { type: actionTypes.TOOGLE_PRODUCT_LIST_LOADER, value };
}

export function handleDeleteStoreProductRequest(product) {
  return { type: actionTypes.HANDLE_DELETE_STORE_PRODUCT_REQUEST, product };
}

export function handleProductDeleteLoading(value) {
  return { type: actionTypes.HANDLE_PRODUCT_DELETE_LOADING, value };
}
export function handleStoreProductEdit(store) {
  return { type: actionTypes.HANDLE_STORE_PRODUCT_EDIT, store };
}

export function handleProductEditRequest(productId) {
  return { type: actionTypes.HANDLE_STORE_PRODUCT_EDIT_REQUEST, productId };
}

export function handleEditLoading(value) {
  return { type: actionTypes.HANDLE_STORE_PRODUCT_EDIT_LOADING, value };
}
export function handleProductImageDeleteRequest(value) {
  return { type: actionTypes.HANDLE_DELETE_PRODUCT_IMAGE_REQUEST, value };
}

export function handleProductCardDataRequest(cardId, cb) {
  return { type: actionTypes.HANDLE_CARD_DATA_REQUEST, cardId, cb };
}
