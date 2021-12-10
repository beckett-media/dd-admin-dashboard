import { combineReducers } from "redux";

import auth from "./auth/reducer";
import app from "./app/reducer";
import userInfo from "./userInfo/reducer";
import product from "./product/reducer";
import storeProduct from "./store-product/reducer";
import store from "./store/reducer";
import common from "./common/reducer";
import orders from "./invoices/reducer";

export default combineReducers({
  auth,
  app,
  userInfo,
  product,
  common,
  orders,
  store,
  storeProduct,
});
