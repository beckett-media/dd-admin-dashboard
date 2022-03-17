import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import CouponRepository from "~/repositories/CouponRepository";
import EditCoupon from "~/components/elements/basic/EditCoupon";

const CouponEdit = () => {
  const { query = {} } = useRouter();
  const [isFullLoading, setIsFullLoading] = useState(true);

  const [coupon, setCoupon] = useState();

  useEffect(() => {
    async function getCouponFull() {
      try {
        const coupon = await CouponRepository.getCouponFull(query.cid);
        setCoupon(coupon.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFullLoading(false);
      }
    }
    if (query?.cid) {
      getCouponFull();
    }
  }, [query]);

  return (
    <>
      <EditCoupon coupon={coupon} />
    </>
  );
};

export default CouponEdit;
