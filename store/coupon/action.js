import actionTypes from "./actionTypes";

export function getCouponListings() {
  return { type: actionTypes.GET_COUPON_LIST_REQUEST };
}

export function setCouponListings(page, list, totalCoupon) {
  return { type: actionTypes.SET_COUPON_LIST, page, list, totalCoupon };
}

export function handleCouponListLoading(value) {
  return { type: actionTypes.TOOGLE_COUPON_LIST_LOADER, value };
}

// export function handleSelectedCouponGet(value) {
//   return { type: actionTypes.HANDLE_SELECTED_COUPON_REQUEST, value };
// }

export function updateCouponPageNumberAction(page) {
  return { type: actionTypes.UPDATE_COUPON_PAGE_NUMBER, page };
}

export function handleDeleteCouponRequest({ id }) {
  return {
    type: actionTypes.HANDLE_DELETE_COUPON_REQUEST,
    couponId: id,
  };
}

export function handleCouponDeleteLoading(value) {
  return { type: actionTypes.HANDLE_COUPON_DELETE_LOADING, value };
}

export function handleCouponEdit(coupon) {
  return { type: actionTypes.HANDLE_COUPON_EDIT, coupon };
}
