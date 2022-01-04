import actionTypes from "./actionTypes";

export function getBlogPressListings() {
  return { type: actionTypes.GET_BLOG_PRESS_LIST_REQUEST };
}

export function setBlogPressListings(page, list, totalBlogs) {
  return { type: actionTypes.SET_BLOG_PRESS_LIST, page, list, totalBlogs };
}

export function handleBlogPressListLoading(value) {
  return { type: actionTypes.TOOGLE_BLOG_PRESS_LIST_LOADER, value };
}

// export function handleSelectedBlogGet(value) {
//   return { type: actionTypes.HANDLE_SELECTED_BLOG_REQUEST, value };
// }

export function updatePageNumberAction(page) {
  return { type: actionTypes.UPDATE_PAGE_NUMBER, page };
}

export function handleDeleteBlogPressRequest({ id }) {
  return {
    type: actionTypes.HANDLE_DELETE_BLOG_PRESS_REQUEST,
    blogId: id,
  };
}

export function handleBlogPressDeleteLoading(value) {
  return { type: actionTypes.HANDLE_BLOG_PRESS_DELETE_LOADING, value };
}

export function handleBlogEdit(blog) {
  return { type: actionTypes.HANDLE_BLOG_EDIT, blog };
}
