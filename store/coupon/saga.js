import { all, call, put, takeLatest, select } from "redux-saga/effects";
import Router from "next/router";
import { notification } from "antd";

import actionTypes from "./actionTypes";
import { getPagination } from "./selectors";
import CouponRepository from "~/repositories/CouponRepository";
import {
  setCouponLists,
  handleCouponListLoading,
  handleCouponDeleteLoading,
  getCouponListings as getCouponMainListings,
} from "./action";
const log = console.log;

function* getCouponListings() {
  try {
    put(handleCouponListLoading(true));
    const pagination = yield select(getPagination);
    const couponList = yield call(CouponRepository.CouponList, {
      ...pagination,
      type: "promo",
    });
    yield put(
      setCouponLists(
        pagination.page,
        couponList?.data?.promos || [],
        couponList?.data?.totalCoupons
      )
    );
  } catch (error) {
    log("error:getCouponListings ", error);
  } finally {
    yield put(handleCouponListLoading(false));
  }
}

function* deleteCoupon({ couponId }) {
  try {
    yield put(handleCouponDeleteLoading(true));
    yield call(CouponRepository.deleteCoupon, couponId);
    yield put(getCouponMainListings());
    notification.success({
      message: "Deleted",
      description: "The Coupon has been successfully deleted",
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    log("error:deleteCoupon ", error);
  } finally {
    yield put(handleCouponDeleteLoading(false));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_COUPON_LIST_REQUEST, getCouponListings),
  ]);
  yield all([
    takeLatest(actionTypes.HANDLE_DELETE_COUPON_REQUEST, deleteCoupon),
  ]);
}
