import actionTypes from "./actionTypes";

export const initState = {
  storeProducts: {},
  isStoreLoading: true,
  filters: {},
  pagination: { page: 1, perPage: 100 },
  isProductCreateLoading: false,
  gradesList: [],
  isProductDeleteLoading: false,
  selectedStoreProduct: null,
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
        isStoreLoading: action.value,
      };

    case actionTypes.SET_STORES_PRODUCTS:
      console.log(action);
      return {
        ...state,
        storeProducts: {
          ...state.lists,
          [action.page]: action.lists,
        },
      };

    case actionTypes.HANDLE_PRODUCT_DELETE_LOADING:
      return {
        ...state,
        isStoreLoading: action.value,
      };

    case actionTypes.HANDLE_STORE_PRODUCT_EDIT:
      console.log("HANDLE_STORE_PRODUCT_EDIT");
      console.log(action);
      return {
        ...state,
        selectedStoreProduct: action.store,
      };
    case actionTypes.HANDLE_STORE_PRODUCT_EDIT_LOADING:
      return {
        ...state,
        isEditLoading: action.value,
      };

    default:
      return state;
  }
}

export default reducer;
