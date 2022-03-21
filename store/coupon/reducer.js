import actionTypes from "./actionTypes";

export const initState = {
  list: {},
  totalCoupon: 0,
  isListLoading: true,
  isCouponDeleteLoading: false,
  selectedCoupon: null,
  pagination: { page: 1, perPage: 5 },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.TOOGLE_COUPON_LIST_LOADER:
      return {
        ...state,
        isListLoading: action.value,
      };

    case actionTypes.SET_COUPON_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          [action.page]: action.list,
        },
        totalCoupon: action.totalCoupon,
      };
    case actionTypes.UPDATE_COUPON_PAGE_NUMBER:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.page,
        },
      };
    case actionTypes.HANDLE_COUPON_DELETE_LOADING:
      return {
        ...state,
        isListLoading: action.value,
      };
    case actionTypes.HANDLE_COUPON_EDIT:
      return {
        ...state,
        selectedCoupon: action.coupon,
      };
    default:
      return state;
  }
}

export default reducer;
