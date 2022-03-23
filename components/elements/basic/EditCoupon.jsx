import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Input, InputNumber, notification } from "antd";

import AuthHoc from "~/repositories/AuthHoc";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { toggleDrawerMenu } from "~/store/app/action";
import { getUserInfo } from "~/store/auth/selectors";
import CouponRepository from "~/repositories/CouponRepository";

import Router from "next/router";

const EditCoupon = ({ coupon }) => {
  const [promoData, setPromoData] = useState();

  useEffect(() => {
    setPromoData(coupon);
  }, [coupon]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);
  return (
    <ContainerDefault title={"Edit  Promo for discount"}>
      <HeaderDashboard
        title={"Edit Promo for user"}
        description={`Due Dilly Edit Promos`}
      />

      <div className="form-group">
        <p>Promo Title</p>

        <Input.TextArea
          style={{ width: "100%" }}
          className="form-control"
          type="text"
          value={promoData?.name}
          onChange={(e) => {
            setPromoData({ ...promoData, name: e.target.value });
          }}
          showCount={true}
          maxLength={20}
          placeholder="Name goes here..."
        />
      </div>
      <div className="form-group">
        <p>Promo Code</p>
        <Input.TextArea
          style={{ width: "100%" }}
          className="form-control"
          type="text"
          value={promoData?.promoCode}
          onChange={(e) => {
            setPromoData({ ...promoData, promoCode: e.target.value });
          }}
          showCount={true}
          maxLength={20}
          placeholder="Promo Code goes here..."
        />
      </div>
      <div className="form-group">
        <p>Promo Percentage</p>
        <InputNumber
          disabled
          style={{ width: "100%" }}
          className="form-control"
          prefix="$"
          rows={1}
          type="number"
          value={promoData?.percentage}
          onChange={(e) => {
            setPromoData({ ...promoData, percentage: e });
          }}
          showCount={true}
          maxLength={20}
          placeholder="Percentage goes here..."
        />
      </div>
      <span>
        <a
          className="ps-btn"
          onClick={async () => {
            try {
              const { data } = await CouponRepository.editUpdateCoupon({
                name: promoData.name,
                id: promoData._id,
                promoCode: promoData.promoCode,
                percentage: promoData.percentage,
              });

              notification.success({
                message: "Updated",
                description: data.promo.name,
              });
              Router.push("/coupons");
            } catch (error) {
              notification.error({ message: "Error", description: error });
            }
          }}
        >
          Update
        </a>
      </span>
    </ContainerDefault>
  );
};

export default AuthHoc(EditCoupon);
