import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import BlogTable from "~/components/shared/tables/BlogTable";

import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { getBlogPressListings } from "~/store/blogPress/action";
import { getCurrentBlogPressList } from "~/store/blogPress/selectors";
import Authenticated from "~/repositories/AuthHoc";

import { useRouter } from "next/router";
import Router from "next/router";

const BlogPage = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    dispatch(getBlogPressListings());
  }, []);


  const { list } = props;

  const newBlog = (event) => {
    event.preventDefault();
    router.push("/blogs/create-blog");
  };

  return (
    <ContainerDefault title="Listings">
      <HeaderDashboard title="Blogs" description="Due Dilly Blogs " />
      <div className="ps-section__actions text-right my-5">
        <a className="ps-btn success" onClick={newBlog}>
          <i className="icon icon-plus mr-2" />
          Create New Blog
        </a>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__content">
          <BlogTable list={list || []} />
        </div>
      </section>
    </ContainerDefault>
  );
};

const connectStateToProps = (state) => {
  return {
    list: getCurrentBlogPressList(state),
  };
};

export default connect(connectStateToProps)(Authenticated(BlogPage));
