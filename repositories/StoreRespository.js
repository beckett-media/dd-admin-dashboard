import Repository, { baseUrl, getError } from "./Repository";

const routes = {
  create: "/store/create",
  store: "/store",
  uploadImages: "/store/update-store-images",
  deleteImage: "/store/image",
};

class StoreRespository {
  async storeList({ page = 1, perPage = 10 }, isAdmin) {
    try {
      const url = `${baseUrl}${routes.store}/${
        isAdmin ? "get-stores/admin/" : ""
      }${perPage}/${page}`;
      const request = await Repository.get(url);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async createStore(store) {
    try {
      const request = await Repository.post(
        `${baseUrl}/admin-store/create`,
        store
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async editStore(store) {
    try {
      const storeId = store._id;
      if (storeId) delete store._id;
      const request = await Repository.put(
        `${baseUrl}${routes.store}/${storeId}`,
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
        `${baseUrl}${routes.store}/${productId}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async addImagesToStore(productId, images) {
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

  async getSelectedStoreEditLoad(storeId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.store}/${storeId}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async deleteImage(storeId, imageId) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.deleteImage}/${storeId}`,
        { fileName: imageId }
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }

  async deleteStore(storeId) {
    try {
      const request = await Repository.delete(
        `${baseUrl}${routes.store}/${storeId}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new StoreRespository();
