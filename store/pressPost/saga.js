import { all, call, put, takeLatest, select } from "redux-saga/effects";
import Router from "next/router";
import { notification } from "antd";

import actionTypes from "./actionTypes";
import { getPagination } from "./selectors";
import BlogPressRepository from "~/repositories/BlogPressRespository";
import {
  setPressListings,
  handlePressListLoading,
  handlePressDeleteLoading,
  getPressListings as getPressMainListings,
} from "./action";
const log = console.log;

function* getPressListings() {
  try {
    put(handlePressListLoading(true));
    const pagination = yield select(getPagination);
    const pressPressList = yield call(BlogPressRepository.blogPressList, {
      ...pagination,
      type: "press",
    });
    yield put(
      setPressListings(
        pagination.page,
        pressPressList?.data?.blogsPress || [],
        pressPressList?.data?.totalDocs
      )
    );
  } catch (error) {
    log("error:getProductListings ", error);
  } finally {
    yield put(handlePressListLoading(false));
  }
}

function* deletePress({ pressId }) {
  try {
    yield put(handlePressDeleteLoading(true));
    yield call(BlogPressRepository.deleteBlogPress, pressId);
    yield put(getPressMainListings());
    notification.success({
      message: "Deleted",
      description: "The press has been successfully deleted",
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    log("error:deletePressPress ", error);
  } finally {
    yield put(handlePressDeleteLoading(false));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actionTypes.GET_PRESS_LIST_REQUEST, getPressListings)]);
  yield all([takeLatest(actionTypes.HANDLE_DELETE_PRESS_REQUEST, deletePress)]);
}
