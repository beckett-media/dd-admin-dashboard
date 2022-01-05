import actionTypes from "./actionTypes";

export const initState = {
  list: {},
  totalBlogs: 0,
  isListLoading: true,
  isBlogDeleteLoading: false,
  selectedBlog: null,
  pagination: { page: 1, perPage: 2 },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.TOOGLE_BLOG_LIST_LOADER:
      return {
        ...state,
        isListLoading: action.value,
      };

    case actionTypes.SET_BLOG_LIST:
      return {
        ...state,
        list: {
          ...state.list,
          [action.page]: action.list,
        },
        totalBlogs: action.totalBlogs,
      };
    case actionTypes.UPDATE_BLOG_PAGE_NUMBER:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.page,
        },
      };
    case actionTypes.HANDLE_BLOG_DELETE_LOADING:
      return {
        ...state,
        isListLoading: action.value,
      };
    case actionTypes.HANDLE_BLOG_EDIT:
      return {
        ...state,
        selectedBlog: action.blog,
      };
    default:
      return state;
  }
}

export default reducer;
