import actionTypes from "./actionTypes";

export const initState = {
  stores: {},
  unclaimedStores: {},
  isStoreLoading: true,
  filters: {},
  pagination: { page: 1, perPage: 300 },
  isProductCreateLoading: false,
  gradesList: [],
  isStoreDeleteLoading: false,
  selectedStore: null,
  isEditLoading: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.TOOGLE_STORE_CREATE_LOADER:
      return {
        ...state,
        isProductCreateLoading: action.value,
      };
    case actionTypes.TOOGLE_STORES_LIST_LOADER:
      return {
        ...state,
        isStoreLoading: action.value,
      };

    case actionTypes.SET_STORES:
      return {
        ...state,
        stores: {
          ...state.lists,
          [action.page]: action.lists,
        },
      };
    case actionTypes.SET_STORES_UNCLAIMED:
      return {
        ...state,
        unclaimedStores: {
          ...state.lists,
          [action.page]: action.lists,
        },
      };
    case actionTypes.HANDLE_STORE_EDIT:
      return {
        ...state,
        selectedStore: action.store,
      };
    case actionTypes.HANDLE_EDIT_LOADING:
			return {
				...state,
				isEditLoading: action.value,
			};

    // case actionTypes.HANDLE_PRODUCT_DELETE_LOADING:
    //   return {
    //     ...state,
    //     isStoreLoading: action.value,
    //   };

    // case actionTypes.HANDLE_STORE_EDIT:
    //   return {
    //     ...state,
    //     selectedStore: action.storeId,
    //   };

    default:
      return state;
  }
}

export default reducer;
