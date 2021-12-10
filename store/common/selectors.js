const getData = (state) => state.common;

export const getPublicProductAndGrade = (state) => {
	return { publicProducts: getData(state).publicProducts || [], publicGrades: getData(state).publicGrades || [] };
};
