import actionTypes from "./actionTypes";

export function getBlogListings() {
  return { type: actionTypes.GET_BLOG_LIST_REQUEST };
}

export function setBlogListings(page, list, totalBlogs) {
  return { type: actionTypes.SET_BLOG_LIST, page, list, totalBlogs };
}

export function handleBlogListLoading(value) {
  return { type: actionTypes.TOOGLE_BLOG_LIST_LOADER, value };
}

// export function handleSelectedBlogGet(value) {
//   return { type: actionTypes.HANDLE_SELECTED_BLOG_REQUEST, value };
// }

export function updateBlogPageNumberAction(page) {
  return { type: actionTypes.UPDATE_BLOG_PAGE_NUMBER, page };
}

export function handleDeleteBlogRequest({ id }) {
  return {
    type: actionTypes.HANDLE_DELETE_BLOG_REQUEST,
    blogId: id,
  };
}

export function handleBlogDeleteLoading(value) {
  return { type: actionTypes.HANDLE_BLOG_DELETE_LOADING, value };
}

export function handleBlogEdit(blog) {
  return { type: actionTypes.HANDLE_BLOG_EDIT, blog };
}
