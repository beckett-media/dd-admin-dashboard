import Repository, { baseUrl, getError } from "./Repository";

const routes = {
	getUserInfo: "/admin/admin-details",
	stripeCodeVerification: "/user/stripe-auth",
	profileUpdate: "/admin/add-update-profile-picture",
};

class AuthenticationRepository {
	async getUserInfo() {
		try {
			const request = await Repository.get(`${baseUrl}${routes.getUserInfo}`);
			return request.data.data;
		} catch (error) {
			getError(error);
		}
	}

	async stripeVerification(code) {
		try {
			const request = await Repository.post(`${baseUrl}${routes.stripeCodeVerification}`, { code });
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}
	async updateProfilePhoto(image) {
		try {
			const formData = new FormData();
			formData.append("profilePicture", image.originFileObj);
			const request = await Repository.post(`${baseUrl}${routes.profileUpdate}`, formData);
			return request.data;
		} catch (error) {
			throw getError(error);
		}
	}
}

export default new AuthenticationRepository();
