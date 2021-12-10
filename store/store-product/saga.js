import actionTypes from "./actionTypes";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  getPagination,
  getSelectedProduct as getSelectedProductSelect,
} from "./selectors";
import StoreProductRespository from "~/repositories/StoreProductRespository";
import {
  handleProductListLoading,
  handleProductLoading,
  setStoresProducts,
  getSelectedStoreProducts as getMainStoreListings,
  handleProductDeleteLoading,
  handleStoreProductEdit,
  handleEditLoading,
} from "./action";
import Router from "next/router";
import { notification } from "antd";
const log = console.log;

function* getSelectedStoreProductsSaga({ storeId }) {
  try {
    put(handleProductListLoading(true));
    const pagination = yield select(getPagination);
    const products = yield call(StoreProductRespository.storeProductList, storeId, pagination);
    yield put(setStoresProducts(pagination.page, products?.data?.listing || []));
    yield put(handleProductListLoading(false));
  } catch (error) {
    log("error:getSelectedStoreProductsSaga ", error);
  }
}

function* addStoreProduct({ store, storeId, isEdit }) {
  try {
    yield put(handleProductLoading(true));

    const { images = [], ...storeRest } = store;

    let item = { ...storeRest };

    console.log("images");
    console.log(images);

    if (isEdit) {
      yield call(StoreProductRespository.editStoreProduct, storeId, storeRest);
    } else {
      if (!storeRest.isPublic) storeRest.isPublic = false;
      const addedProduct = yield call(
        StoreProductRespository.createProduct,
        storeId,
        storeRest
      );
      item = addedProduct?.data;
    }

    if (images && images.length) {
    console.log("Inside");

    console.log(item);

      const store = item?.listing?.id || item?._id || null;

      if (Boolean(store)) {
        const newImages = images.filter((i) => i.originFileObj);

        yield call(StoreProductRespository.addImagesToProduct, store, newImages);
      }
    }

    yield put(handleProductLoading(false));
    yield put(getMainStoreListings(storeId));
    Router.replace(`/store/${storeId}`);
    notification.success({
      message: isEdit ? "Updated" : "Created",
      description: `The product has been successfully ${
        isEdit ? "updated" : "created"
      } `,
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    yield put(handleProductLoading(false));
    log("error:addStore ", error);
  }
}

function* deleteStoreProduct({ product }) {
  try {
    yield put(handleProductDeleteLoading(true));
    yield call(StoreProductRespository.deleteProduct, product._id);
    yield put(getMainStoreListings(product.store));
    notification.success({
      message: "Deleted",
      description: "The product has been successfully deleted",
    });
    yield put(handleProductDeleteLoading(false));
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    yield put(handleProductDeleteLoading(false));
    log("error:deleteProduct ", error);
  }
}

function* getSelectedStoreProduct({ productId }) {
  try {
    // const selectedItem = yield select(getSelectedProductSelect);
    // if (selectedItem) return;
    yield put(handleEditLoading(true));
    const { data } = yield call(StoreProductRespository.getSelectedStoreProduct, productId);
    const item = data.cardDetail[0];
    yield put(handleStoreProductEdit(item));

    yield put(handleEditLoading(false));
  } catch (error) {
    yield put(handleEditLoading(false));
    notification.error({ message: "Error", description: error + "" });
  }
}

function* deleteProductImage({ value: image }) {
  try {
    const selectedItem = yield select(getSelectedProductSelect);
    if (!selectedItem) return;
    yield call(StoreProductRespository.deleteImage, selectedItem._id, image.uid);
    notification.success({
      message: "Deleted",
      description: "The selected image has been deleted",
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_STORE_PRODUCTS_OF_USER_REQUEST, getSelectedStoreProductsSaga),
  ]);
  yield all([takeLatest(actionTypes.ADD_NEW_STORE_PRODUCT_REQUEST, addStoreProduct)]);
  yield all([
    takeLatest(actionTypes.HANDLE_DELETE_STORE_PRODUCT_REQUEST, deleteStoreProduct),
  ]);
  yield all([
    takeLatest(actionTypes.HANDLE_STORE_PRODUCT_EDIT_REQUEST, getSelectedStoreProduct),
  ]);
  yield all([
    takeLatest(
      actionTypes.HANDLE_DELETE_PRODUCT_IMAGE_REQUEST,
      deleteProductImage
    ),
  ]);
}
