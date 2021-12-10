import actionTypes from "./actionTypes";

export function getUserStores(isAdmin = false) {
  return { type: actionTypes.GET_STORES_OF_USER_REQUEST, isAdmin };
}

export function setStores(page, lists) {
  return { type: actionTypes.SET_STORES, page, lists };
}

export function setStoresUnclaimed(page, lists) {
  return { type: actionTypes.SET_STORES_UNCLAIMED, page, lists };
}

export function createNewStore(store, isEdit, isAdmin = false) {
  return { type: actionTypes.ADD_NEW_STORE_REQUEST, store, isEdit, isAdmin };
}

export function handleStoreLoading(value) {
  return { type: actionTypes.TOOGLE_STORE_CREATE_LOADER, value };
}

export function handleStoreEditRequest(storeId) {
  return { type: actionTypes.HANDLE_STORE_EDIT_LOAD_REQUEST, storeId };
}

export function handleProductListLoading(value) {
  return { type: actionTypes.TOOGLE_STORES_LIST_LOADER, value };
}

export function handleStoreEdit(store) {
	return { type: actionTypes.HANDLE_STORE_EDIT, store };
}

export function handleStoreDelete(storeId, isAdmin) {
	return { type: actionTypes.HANDLE_STORE_DELETE, storeId, isAdmin };
}

export function handleStoreDeleteLoading(value) {
	return { type: actionTypes.HANDLE_STORE_DELETE_LOADING, value };
}

export function handleEditLoading(value) {
	return { type: actionTypes.HANDLE_EDIT_LOADING, value };
}

export function handleStoreImageDeleteRequest(value){
	return { type: actionTypes.HANDLE_DELETE_STORE_IMAGE_REQUEST, value };
}