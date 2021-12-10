import Repository, { baseUrl, getError } from "./Repository";

const routes = {
	products: "/public-products",
	grades: "/public-grade",
};

class CommonRespository {
	async gePublicGradesAndProducts() {
		try {
			const productRequest = await Repository.get(`${baseUrl}${routes.products}`);
			const gradeRequest = await Repository.get(`${baseUrl}${routes.grades}`);
			return {
				products: productRequest?.data?.data?.products || [],
				grades: gradeRequest?.data?.data?.grades || [],
			};
		} catch (error) {
			throw getError(error);
		}
	}
}

export default new CommonRespository();
