import actionTypes from "./actionTypes";

export function getPublicGradedAndProductsListings() {
	return { type: actionTypes.GET_PUBLIC_GRADES_AND_PRODUCT_REQUEST };
}

export function setPublicGradedAndProductsListings({ products = [], grades = [] }) {
	return { type: actionTypes.SET_PUBLIC_GRADES_AND_PRODUCTS_VALUE, products, grades };
}
