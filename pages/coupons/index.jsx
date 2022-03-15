import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import BlogTable from "~/components/shared/tables/BlogTable";

import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { getCouponListings } from "~/store/coupon/action";
import { getCurrentCouponList } from "~/store/coupon/selectors";
import Authenticated from "~/repositories/AuthHoc";

import { useRouter } from "next/router";
import Router from "next/router";

const CouponPage = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    dispatch(getCouponListings());
  }, []);

  const { list } = props;

  const newCoupon = (event) => {
    event.preventDefault();
    router.push("/coupons/create-coupon");
  };

  return (
    <ContainerDefault title="Listings">
      <HeaderDashboard title="Coupons" description="Due Dilly Coupon" />
      <div className="ps-section__actions text-right my-5">
        <a className="ps-btn success" onClick={newCoupon}>
          <i className="icon icon-plus mr-2" />
          Create Promo Code
        </a>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__content">
          <BlogTable list={list || []} pageName="Coupons" />
        </div>
      </section>
    </ContainerDefault>
  );
};

const connectStateToProps = (state) => {
  return {
    list: getCurrentCouponList(state),
  };
};

export default connect(connectStateToProps)(Authenticated(CouponPage));
