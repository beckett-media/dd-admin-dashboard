import Repository, { baseUrl, getError } from "./Repository";

const routes = {
  coupon: "/promo",
};

class CouponRepository {
  async CouponList({ page = 1, perPage = 10, type }) {
    try {
      // const url = `${baseUrl}${routes.coupon}/${perPage}/${page}/${type}`;
      const url = `${baseUrl}${routes.coupon}`;
      const request = await Repository.get(url);
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async createCoupon(coupon) {
    try {
      const request = await Repository.post(
        `${baseUrl}${routes.coupon}`,
        coupon
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async getCouponFull(couponId) {
    try {
      const request = await Repository.get(
        `${baseUrl}${routes.coupon}/${couponId}`
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async editUpdateCoupon(coupon) {
    try {
      const couponId = coupon.id;
      const request = await Repository.patch(
        `${baseUrl}${routes.coupon}/${couponId}`,
        {
          name: coupon.name,
          promoCode: coupon.promoCode,
          percentage: coupon.percentage,
        }
      );
      return request.data;
    } catch (error) {
      throw getError(error);
    }
  }
  async deleteCoupon(couponId) {
    try {
      await Repository.delete(`${baseUrl}${routes.coupon}/${couponId}`);
    } catch (error) {
      throw getError(error);
    }
  }
}

export default new CouponRepository();
