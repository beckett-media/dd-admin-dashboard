import { all, call, put, takeLatest, select } from "redux-saga/effects";
import actionTypes from "./actionTypes";
import CommonRespository from "~/repositories/CommonRespository";
import { setPublicGradedAndProductsListings } from "./action";

const log = console.log;

function* getGradesAndProductPublicListings() {
	try {
		const response = yield call(CommonRespository.gePublicGradesAndProducts);
		yield put(setPublicGradedAndProductsListings(response));
	} catch (error) {
		log(error, "[getGradesAndProductPublicListings]");
	}
}

export default function* rootSaga() {
	yield all([takeLatest(actionTypes.GET_PUBLIC_GRADES_AND_PRODUCT_REQUEST, getGradesAndProductPublicListings)]);
}
