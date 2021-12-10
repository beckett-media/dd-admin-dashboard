import Repository, { baseUrl, getError } from "./Repository";

const routes = {
	get: "/listing/seller",
};

class InvoicesRepository {
	async getInvoices() {
		try {
			const perpage = 100;
			const page = 1;
			const url = `${baseUrl}${routes.get}/${perpage}/${page}`;
			const response = await Repository.get(url);

			return response;
		} catch (error) {
			throw getError(error);
		}
	}
}

export default new InvoicesRepository();
