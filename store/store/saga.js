import actionTypes from "./actionTypes";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  getPagination,
  getSelectedStore as getSelectedStoreSelect,
} from "./selectors";
import StoreRespository from "~/repositories/StoreRespository";
import {
  handleProductListLoading,
  handleStoreLoading,
  setStores,
  setStoresUnclaimed,
  getUserStores,
  handleEditLoading,
  handleStoreEdit,
  handleStoreDeleteLoading,
} from "./action";
import Router from "next/router";
import { notification } from "antd";
const log = console.log;

function* getStoreListings({ isAdmin }) {
  try {
    put(handleProductListLoading(true));
    const pagination = yield select(getPagination);
    const products = yield call(StoreRespository.storeList, pagination, isAdmin);
    if(isAdmin){
      yield put(setStoresUnclaimed(pagination.page, products?.data?.stores || []));
    }else{
      yield put(setStores(pagination.page, products?.data?.stores || []));
    }
    yield put(handleProductListLoading(false));
  } catch (error) {
    log("error:getStoreListings ", error);
  }
}

function* addStore({ store, isEdit, isAdmin }) {
  try {
    yield put(handleStoreLoading(true));

    const { images = [], ...storeRest } = store;

    let item = { ...storeRest };
    if (isEdit) {
      yield call(StoreRespository.editStore, storeRest);
    } else {
      if (!storeRest.isPublic) storeRest.isPublic = false;
      const addedStore = yield call(StoreRespository.createStore, storeRest, isAdmin);
      item = addedStore?.data;
    }

    if (images && images.length) {
      const store = item?.store?.id || item?._id || null;

      if (Boolean(store)) {
        const newImages = images.filter((i) => i.originFileObj);

        yield call(StoreRespository.addImagesToStore, store, newImages);
      }
    }

    yield put(handleStoreLoading(false));
    yield put(getUserStores());
    if (isAdmin) {
      Router.replace("/admin/unclaimed-stores");
    } else {
      Router.replace("/stores");
    }
    notification.success({
      message: isEdit ? "Updated" : "Created",
      description: `The store has been successfully ${
        isEdit ? "updated" : "created"
      } `,
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    yield put(handleStoreLoading(false));
    log("error:addStore ", error);
  }
}

function* getSelectedStoreEditLoad({ storeId }) {
  try {
    // const selectedItem = yield select(getSelectedProductSelect);
    // if (selectedItem) return;
    yield put(handleEditLoading(true));
    const { data } = yield call(
      StoreRespository.getSelectedStoreEditLoad,
      storeId
    );
    yield put(handleStoreEdit(data.store));

    yield put(handleEditLoading(false));
  } catch (error) {
    yield put(handleEditLoading(false));
    notification.error({ message: "Error", description: error + "" });
  }
}

function* deleteStoreImage({ value: image }) {
  try {
    const selectedItem = yield select(getSelectedStoreSelect);
    if (!selectedItem) return;
    yield call(StoreRespository.deleteImage, selectedItem._id, image.uid);
    notification.success({
      message: "Deleted",
      description: "The selected image has been deleted",
    });
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
  }
}

function* deleteStore({ storeId, isAdmin }) {
  try {
    yield put(handleStoreDeleteLoading(true));
    let response = yield call(StoreRespository.deleteStore, storeId);
    if (response.success === false) {
      notification.error({
        message: "Deleted",
        description: "This store contains products. Delete products first",
      });
      yield put(handleStoreDeleteLoading(false));
    } else {
      yield put(getUserStores(isAdmin));
      notification.success({
        message: "Deleted",
        description: "The store has been successfully deleted",
      });
      yield put(handleStoreDeleteLoading(false));
    }
  } catch (error) {
    notification.error({ message: "Error", description: error + "" });
    yield put(handleStoreDeleteLoading(false));
    log("error:deleteStore ", error);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_STORES_OF_USER_REQUEST, getStoreListings),
  ]);
  yield all([takeLatest(actionTypes.ADD_NEW_STORE_REQUEST, addStore)]);
  yield all([
    takeLatest(
      actionTypes.HANDLE_STORE_EDIT_LOAD_REQUEST,
      getSelectedStoreEditLoad
    ),
  ]);
  yield all([
    takeLatest(actionTypes.HANDLE_DELETE_STORE_IMAGE_REQUEST, deleteStoreImage),
  ]);
  yield all([takeLatest(actionTypes.HANDLE_STORE_DELETE, deleteStore)]);
}
