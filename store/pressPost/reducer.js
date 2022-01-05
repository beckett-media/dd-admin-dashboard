import actionTypes from "./actionTypes";

export const initState = {
  list: {},
  totalPress: 0,
  isListLoading: true,
  isPressDeleteLoading: false,
  selectedPress: null,
  pagination: { page: 1, perPage: 2 },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.TOOGLE_PRESS_LIST_LOADER:
      return {
        ...state,
        isListLoading: action.value,
      };

    case actionTypes.SET_PRESS_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          [action.page]: action.list,
        },
        totalPress: action.totalPress,
      };
    case actionTypes.UPDATE_PRESS_PAGE_NUMBER:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.page,
        },
      };
    case actionTypes.HANDLE_PRESS_DELETE_LOADING:
      return {
        ...state,
        isListLoading: action.value,
      };
    case actionTypes.HANDLE_PRESS_EDIT:
      return {
        ...state,
        selectedPress: action.press,
      };
    default:
      return state;
  }
}

export default reducer;
