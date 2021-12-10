import Repository, { baseUrl, getError } from "./Repository";

const routes = {
  create: "/store-listing",
  storeProducts: "/store-listing",
  store: "/store",
  uploadImages: "/store-listing/update-listing-images",
  deleteImage: "/store-listing/image",
  getSportCard: "/sports-card/card-fac",
};

class StoreRespository {
  async storeProductList(storeId, { page = 1, perPage = 10 }, payload) {
    try {
      const url = `${baseUrl}${routes.store}/${storeId}/${perPage}/${page}`;
      const request = await Repository.get(url);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async createProduct(storeId, store) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.create}/${storeId}/create`,
        store
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async editStoreProduct(storeId, store) {
    try {
      const productId = store._id;
      if (productId) delete store._id;
      const request = await Repository.put(
        `${baseUrl}${routes.storeProducts}/${storeId}/${productId}`,
        store
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async deleteProduct(productId) {
    try {
      const request = await Repository.delete(
        `${baseUrl}${routes.storeProducts}/${productId}`
      );
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

  async getSelectedStoreProduct(productId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.storeProducts}/${productId}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async deleteImage(productId, imageId) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.deleteImage}/${productId}`,
        { fileName: imageId }
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async getCardData(cardId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.getSportCard}/${cardId}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new StoreRespository();
