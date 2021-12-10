import actionTypes from "./actionTypes";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { getPagination, getSelectedProduct as getSelectedProductSelect } from "./selectors";
import ProductRespository from "~/repositories/ProductRespository";
import { handleProductListLoading, handleProductLoading, setProductListings, getProductListings as getMainProductListings, handleProductDeleteLoading, handleProductEdit, handleEditLoading } from "./action";
import Router from "next/router";
import { notification } from "antd";
const log = console.log;

function* getProductListings() {
	try {
		put(handleProductListLoading(true));
		const pagination = yield select(getPagination);
		const products = yield call(ProductRespository.productList, pagination);
		yield put(setProductListings(pagination.page, products?.data?.listing || []));
		yield put(handleProductListLoading(false));
	} catch (error) {
		log("error:getProductListings ", error);
	}
}

function* addProduct({ product, isEdit }) {
	try {
		yield put(handleProductLoading(true));

		const { images = [], ...productRest } = product;

		let item = { ...productRest };
		if (isEdit) {
			yield call(ProductRespository.editProduct, productRest);
		} else {
			if (!productRest.isPublic) productRest.isPublic = false;
			if (!productRest.cardId) productRest.cardId = "";
			const addedProduct = yield call(ProductRespository.createProduct, productRest);
			item = addedProduct?.data;
		}

		if (images && images.length) {
			const listingId = item?.listing?.id || item?._id || null;

			if (Boolean(listingId)) {
				const newImages = images.filter((i) => i.originFileObj);

				yield call(ProductRespository.addImagesToProduct, listingId, newImages);
			}
		}

		yield put(handleProductLoading(false));
		yield put(getMainProductListings());
		Router.replace("/products");
		notification.success({ message: isEdit ? "Updated" : "Created", description: `The product has been successfully ${isEdit ? "updated" : "created"} ` });
	} catch (error) {
		notification.error({ message: "Error", description: error + "" });
		yield put(handleProductLoading(false));
		log("error:addProduct ", error);
	}
}

function* deleteProduct({ product }) {
	try {
		yield put(handleProductDeleteLoading(true));
		yield call(ProductRespository.deleteProduct, product._id);
		yield put(getMainProductListings());
		notification.success({ message: "Deleted", description: "The product has been successfully deleted" });
		yield put(handleProductDeleteLoading(false));
	} catch (error) {
		notification.error({ message: "Error", description: error + "" });
		yield put(handleProductDeleteLoading(false));
		log("error:deleteProduct ", error);
	}
}

function* getSelectedProduct({ productId }) {
	try {
		// const selectedItem = yield select(getSelectedProductSelect);
		// if (selectedItem) return;
		yield put(handleEditLoading(true));
		const { data } = yield call(ProductRespository.getSelectedProduct, productId);
		const item = data.cardDetail[0];
		yield put(handleProductEdit(item));

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
		yield call(ProductRespository.deleteImage, selectedItem._id, image.uid);
		notification.success({ message: "Deleted", description: "The selected image has been deleted" });
	} catch (error) {
		notification.error({ message: "Error", description: error + "" });
	}
}

function* handleCardDardData({ cardId, cb }) {
	try {
		const cardData = yield call(ProductRespository.getCardData, cardId);

		if (cardData.success) {
			const { card } = cardData.data;

			const payload = {
				cardType: card.cardType,
				brand: card.brand,
				cardNumber: card.cardNumber,
				playerNames: card.playerNames,
				images: [card.back, card.front],
				year: card.year,
			};
			if (cb) cb(payload);
		}
	} catch (error) {}
}

export default function* rootSaga() {
	yield all([takeLatest(actionTypes.GET_PRODUCT_LISTINGS_REQUEST, getProductListings)]);
	yield all([takeLatest(actionTypes.ADD_NEW_PRODUCT_REQUEST, addProduct)]);
	yield all([takeLatest(actionTypes.HANDLE_DELETE_PRODUCT_REQUEST, deleteProduct)]);
	yield all([takeLatest(actionTypes.HANDLE_PRODUCT_EDIT_REQUEST, getSelectedProduct)]);
	yield all([takeLatest(actionTypes.HANDLE_DELETE_PRODUCT_IMAGE_REQUEST, deleteProductImage)]);
	yield all([takeLatest(actionTypes.HANDLE_CARD_DATA_REQUEST, handleCardDardData)]);
}
