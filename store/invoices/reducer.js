import actionTypes from "./actionTypes";
const initState = {
	orders: [],
};

export default function reducer(state = initState, action) {
	switch (action.type) {
		case actionTypes.GET_INVOICES_SUCCESS:
			return {
				...state,
				orders: action.orders,
			};

		default:
			return state;
	}
}
