import actionTypes from "./actionTypes";

export const initState = {
	publicGrades: [],
	publicProducts: [],
};

function reducer(state = initState, action) {
	try {
		switch (action.type) {
			case actionTypes.SET_PUBLIC_GRADES_AND_PRODUCTS_VALUE:
				return {
					...state,
					publicProducts: action.products,
					publicGrades: action.grades,
				};

			default:
				return state;
		}
	} catch (error) {
		return state;
	}
}

export default reducer;
