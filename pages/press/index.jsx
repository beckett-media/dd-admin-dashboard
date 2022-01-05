import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import BlogTable from "~/components/shared/tables/BlogTable";

import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { getPressListings } from "~/store/pressPost/action";
import { getCurrentPressPostList } from "~/store/pressPost/selectors";
import Authenticated from "~/repositories/AuthHoc";

import { useRouter } from "next/router";

const BlogPage = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    dispatch(getPressListings());
  }, []);


  const { list } = props;

  const newPress = () => {
    router.push("/press/create-press");
  };

  return (
    <ContainerDefault title="Listings">
      <HeaderDashboard title="Press" description="Due Dilly Press " />
      <div className="ps-section__actions text-right my-5">
        <a className="ps-btn success" onClick={newPress}>
          <i className="icon icon-plus mr-2" />
          Create New Press
        </a>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__content">
          <BlogTable list={list || []} pageName="press"/>
        </div>
      </section>
    </ContainerDefault>
  );
};

const connectStateToProps = (state) => {
  return {
    list: getCurrentPressPostList(state),
  };
};

export default connect(connectStateToProps)(Authenticated(BlogPage));
