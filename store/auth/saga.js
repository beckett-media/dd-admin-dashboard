import AuthService from "~/repositories/AuthenticationRespository";
import { all, call, put, cancel, takeLatest } from "redux-saga/effects";
import { notification } from "antd";
import actionTypes from "./actionTypes";
import { loginSuccess, logOutSuccess } from "./action";
import { appName } from "~/repositories/Repository";
import { getUserDetails, toggleUserInfoLoading } from "../userInfo/action";
import Router from "next/router";

const modalSuccess = (type) => {
  notification[type]({
    message: "Welcome back",
    description: "You have succesfully logged in!",
  });
};

const modalWarning = (type) => {
  notification[type]({
    message: "Good bye!",
    description: "You have been logged out!",
  });
};

function* signUpSaga(action) {
  try {
    const { payload, tokens } = yield call(AuthService.register, action.payload);
    for (const key of Object.keys(tokens)) localStorage.setItem(`${appName}_${key}`, tokens[key]);
    modalSuccess("success");
    yield put(loginSuccess(payload.user));
    yield put(toggleUserInfoLoading(false));
    Router.replace("/account/login");
  } catch (err) {
    yield put(toggleUserInfoLoading(false));
    notification.error({
      message: "Failed",
      description: err + "",
    });
    throw err;
  } finally {
    yield cancel();
  }
}

function* loginSaga(action) {
  try {
    let _tokens;
    let _payload;
    if (action.payload.tokens) {
      _tokens = action.payload.tokens;
    } else {
      const { payload, tokens } = yield call(AuthService.login, action.payload);
      _tokens = tokens;
      _payload = payload;
    }

    for (const key of Object.keys(_tokens)) localStorage.setItem(`${appName}_${key}`, _tokens[key]);

    if (action.payload.tokens) {
      yield put(getUserDetails());
    } else {
      modalSuccess("success");
      yield put(loginSuccess(_payload.user));
    }
    yield put(toggleUserInfoLoading(false));
    // Router.push("/");
  } catch (error) {
    yield put(toggleUserInfoLoading(false));
    notification.error({
      message: "Failed",
      description: error + "",
    });
  } finally {
    yield cancel();
  }
}

function* logOutSaga() {
  try {
    yield call(AuthService.logout);
    yield put(logOutSuccess());
    localStorage.removeItem(`${appName}_xAuthToken`);
    localStorage.removeItem(`${appName}_refreshToken`);
    modalWarning("warning");
    Router.replace("/account/login");
  } catch (err) {}
}

function* forgotpasswordSaga({ method, payload, callback }) {
  try {
    switch (method) {
      case "send-otp":
        yield call(AuthService.sendotp, payload);
        notification.success({
          message: "Success",
          description: "Please check your email for the OTP",
        });
        if (callback) callback();
        break;
      case "verify-otp":
        yield call(AuthService.verifyOtp, payload);
        notification.success({
          message: "Success",
          description: "OTP has been verified!",
        });
        if (callback) callback();
        break;
      case "newpassword":
        yield call(AuthService.newpassword, payload);
        notification.success({
          message: "Success",
          description: "Your password has been reset!",
        });
        if (callback) callback();
        break;
    }
  } catch (error) {
    notification.error({
      message: "Failed",
      description: error + "",
    });
    if (callback) callback(true);
  } finally {
    yield cancel();
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actionTypes.SIGNUP_REQUEST, signUpSaga)]);
  yield all([takeLatest(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeLatest(actionTypes.LOGOUT, logOutSaga)]);
  yield all([takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga)]);
}
