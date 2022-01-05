import { all, call, put, takeLatest, select } from "redux-saga/effects";
import Router from "next/router";
import { notification } from "antd";

import actionTypes from "./actionTypes";
import { getPagination } from "./selectors";
import BlogPressRepository from "~/repositories/BlogPressRespository";
import {
  setBlogListings,
  handleBlogListLoading,
  handleBlogDeleteLoading,
  getBlogListings as getBlogMainListings,
} from "./action";
const log = console.log;

function* getBlogListings() {
  try {
    put(handleBlogListLoading(true));
    const pagination = yield select(getPagination);
    const blogPressList = yield call(BlogPressRepository.blogPressList, {
      ...pagination,
      type: "blog",
    });
    yield put(
      setBlogListings(
        pagination.page,
        blogPressList?.data?.blogsPress || [],
        blogPressList?.data?.totalDocs
      )
    );
  } catch (error) {
    log("error:getProductListings ", error);
  } finally {
    yield put(handleBlogListLoading(false));
  }
}

function* deleteBlog({ blogId }) {
  try {
    yield put(handleBlogDeleteLoading(true));
    yield call(BlogPressRepository.deleteBlogPress, blogId);
    yield put(getBlogMainListings());
    notification.success({
      message: "Deleted",
      description: "The blog has been successfully deleted",
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    log("error:deletePressBlog ", error);
  } finally {
    yield put(handleBlogDeleteLoading(false));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actionTypes.GET_BLOG_LIST_REQUEST, getBlogListings)]);
  yield all([takeLatest(actionTypes.HANDLE_DELETE_BLOG_REQUEST, deleteBlog)]);
}
