import actionTypes from "./actionTypes";

export function getPressListings() {
  return { type: actionTypes.GET_PRESS_LIST_REQUEST };
}

export function setPressListings(page, list, totalPress) {
  return { type: actionTypes.SET_PRESS_LIST, page, list, totalPress };
}

export function handlePressListLoading(value) {
  return { type: actionTypes.TOOGLE_PRESS_LIST_LOADER, value };
}

// export function handleSelectedPressGet(value) {
//   return { type: actionTypes.HANDLE_SELECTED_PRESS_REQUEST, value };
// }

export function updatePressPageNumberAction(page) {
  return { type: actionTypes.UPDATE_PRESS_PAGE_NUMBER, page };
}

export function handleDeletePressRequest({ id }) {
  return {
    type: actionTypes.HANDLE_DELETE_PRESS_REQUEST,
    pressId: id,
  };
}

export function handlePressDeleteLoading(value) {
  return { type: actionTypes.HANDLE_PRESS_DELETE_LOADING, value };
}

export function handlePressEdit(press) {
  return { type: actionTypes.HANDLE_PRESS_EDIT, press };
}
