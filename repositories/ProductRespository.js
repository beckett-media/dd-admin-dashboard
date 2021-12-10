import Repository, { baseUrl, getError } from "./Repository";

const routes = {
	create: "/listing/create",
	list: "/listing",
	uploadImages: "/listing/update-lsiting-images",
	deleteImage: "/listing/image",
	getSportCard: "/sports-card/card-fac",
};

class ProductRespository {
	async productList({ page = 1, perPage = 10 }, payload) {
		try {
			const url = `${baseUrl}${routes.list}/${perPage}/${page}`;
			const request = await Repository.get(url);
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}
	async createProduct(product) {
		try {
			const request = await Repository.post(`${baseUrl}${routes.create}`, product);
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}
	async editProduct(product) {
		try {
			const productId = product._id;
			if (productId) delete product._id;
			const request = await Repository.put(`${baseUrl}${routes.list}/${productId}`, product);
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}
	async deleteProduct(productId) {
		try {
			const request = await Repository.delete(`${baseUrl}${routes.list}/${productId}`);
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}
	async addImagesToProduct(productId, images) {
		try {
			const url = `${baseUrl}${routes.uploadImages}/${productId}`;
			const formData = new FormData();

			for (const image of images) {
				formData.append("images", image.originFileObj);
			}

			const request = await Repository.post(url, formData);

			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}

	async getSelectedProduct(productId) {
		try {
			const request = await Repository.get(`${baseUrl}${routes.list}/${productId}`);
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}

	async deleteImage(productId, imageId) {
		try {
			const request = await Repository.post(`${baseUrl}${routes.deleteImage}/${productId}`, { fileName: imageId });
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}

	async getCardData(cardId) {
		try {
			const request = await Repository.get(`${baseUrl}${routes.getSportCard}/${cardId}`);
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}
}

export default new ProductRespository();
