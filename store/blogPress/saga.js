import { all, call, put, takeLatest, select } from "redux-saga/effects";
import Router from "next/router";
import { notification } from "antd";

import actionTypes from "./actionTypes";
import { getPagination } from "./selectors";
import BlogPressRepository from "~/repositories/BlogPressRespository";
import {
  setBlogPressListings,
  handleBlogPressListLoading,
  handleBlogPressDeleteLoading,
  getBlogPressListings as getBlogPressMainListings,
} from "./action";
const log = console.log;

function* getBlogPressListings() {
  try {
    put(handleBlogPressListLoading(true));
    const pagination = yield select(getPagination);
    const blogPressList = yield call(
      BlogPressRepository.blogPressList,
      pagination
    );
    yield put(
      setBlogPressListings(
        pagination.page,
        blogPressList?.data?.blogsPress || [],
        blogPressList?.data?.totalDocs
      )
    );
  } catch (error) {
    log("error:getProductListings ", error);
  } finally {
    yield put(handleBlogPressListLoading(false));
  }
}

function* deleteBlogPress({ blogId }) {
  try {
    yield put(handleBlogPressDeleteLoading(true));
    yield call(BlogPressRepository.deleteBlogPress, blogId);
    yield put(getBlogPressMainListings());
    notification.success({
      message: "Deleted",
      description: "The blog/press has been successfully deleted",
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    log("error:deletePressBlog ", error);
  } finally {
    yield put(handleBlogPressDeleteLoading(false));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_BLOG_PRESS_LIST_REQUEST, getBlogPressListings),
  ]);
  yield all([
    takeLatest(actionTypes.HANDLE_DELETE_BLOG_PRESS_REQUEST, deleteBlogPress),
  ]);
}
