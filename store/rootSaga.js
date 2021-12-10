import { all } from "redux-saga/effects";
import AppSaga from "./app/saga";
import AuthSaga from "./auth/saga";
import UserSaga from "./userInfo/saga";
import ProductSaga from "./product/saga";
import StoreProductSaga from "./store-product/saga";
import StoreSaga from "./store/saga";
import CommonSaga from "./common/saga";
import OrderSaga from "./invoices/saga";

export default function* rootSaga() {
  yield all([
    AppSaga(),
    AuthSaga(),
    UserSaga(),
    ProductSaga(),
    StoreSaga(),
    CommonSaga(),
    OrderSaga(),
    StoreProductSaga()
  ]);
}
