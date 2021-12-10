import { all, call, put, takeLatest } from "redux-saga/effects";
import actionTypes from "./actionTypes";
import UserService from "~/repositories/UserRespository";
import { loginSuccess, logOutSuccess } from "../auth/action";
import { toggleUserInfoLoading } from "./action";
import { notification } from "antd";
import Router from "next/router";

const showNotification = (type = "error", payload) => {
	/*
	payload:{
		message: string,
		description: string,
	}

*/
	notification[type](payload);
};

function* getUserDetails() {
	try {
		yield put(toggleUserInfoLoading(true));
		const userInfo = yield call(UserService.getUserInfo);

		yield put(loginSuccess(userInfo.user));
		yield put(toggleUserInfoLoading(false));
	} catch (error) {
		// notification.error({ message: "Failed", description: error + "" });
		yield put(toggleUserInfoLoading(false));
		yield put(logOutSuccess());
	}
}

function* stripeCodeVerification(action) {
	try {
		yield call(UserService.stripeVerification, action.code);
		notification.success({ message: "Verification Complete", description: "The stripe verifcation has been completed" });
		const path = action.redirectPath ? action.redirectPath : "/products/create-product";

		Router.replace(path);
	} catch (error) {
		notification.error({ message: "Verification Failed", description: error + "" });
	}
}

function* updateUserName({ userName }) {
	try {
		const userInfo = yield call(UserService.updateUserName, userName);
		yield put(loginSuccess(userInfo.data.user));
		notification.success({ message: "Updated", description: "User Name Updated" });
	} catch (error) {
		notification.error({ message: "Failed", description: error + "" });
	}
}

function* updateProfilePhoto({ image, callback }) {
	try {
		const userInfo = yield call(UserService.updateProfilePhoto, image);
		yield put(loginSuccess({ ...userInfo.data.user, number: Math.random() }));
		if (callback) callback(image);
		notification.success({ message: "Updated", description: "Profile Photo Updated" });
	} catch (error) {
		notification.error({ message: "Failed", description: error + "" });
		if (callback) callback();
	}
}

export default function* rootSaga() {
	yield all([takeLatest(actionTypes.GET_USER_DETAILS_REQUEST, getUserDetails)]);
	yield all([takeLatest(actionTypes.STRIPE_CODE_VERIFICTION_REQUEST, stripeCodeVerification)]);
	yield all([takeLatest(actionTypes.UPDATE_USER_NAME, updateUserName)]);
	yield all([takeLatest(actionTypes.UPDATE_PROFILE_PHOTO, updateProfilePhoto)]);
}
