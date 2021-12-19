import React, { useEffect, useState } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import TableProjectItems from "~/components/shared/tables/TableProjectItems";

import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { getProductListings } from "~/store/product/action";
import { getCurrentProductList } from "~/store/product/selectors";
import Authenticated from "~/repositories/AuthHoc";
import { getUserStripeId } from "~/store/auth/selectors";

import { useRouter } from "next/router";
import Router from "next/router";
import StripeConnect from "~/components/partials/account/StripeConnect";

const BlogPage = (props) => {
  // const [isStripeModalVisible, setisStripeModalVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleModalValue = () => {
    setisStripeModalVisible((prev) => !prev);
  };
  const list = [{
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  },
  {
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 1,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 2,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 4,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 4,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 4,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 4,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }, {
    id: 4,
    images: [{ url: ("https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688") }],
    title: "1st Blog",
    quantity: "",
    price: "",
  }]



  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    // dispatch(getProductListings());
  }, []);

  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    // console.log(rule)
    // if (user?.role == "admin") {
    //   Router.replace("/admin");
    // } else {
    Router.replace("/blogs");
    // }
    // return;
  }, []);

  // const { list, stripeId } = props;

  const newBlog = (event) => {
    event.preventDefault();
    // if (!stripeId) toggleModalValue();
    router.push("/blogs/create-blog");
  };

  return (
    <ContainerDefault title="Listings">
      <HeaderDashboard
        title="Blogs"
        description="Due Dilly Blogs "
      />
      <div className="ps-section__actions text-right my-5">
        <a className="ps-btn success" onClick={newBlog}>
          <i className="icon icon-plus mr-2" />
          Create New Blog
        </a>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__content">
          <TableProjectItems list={list || []} />
        </div>
      </section>

      {/* {isStripeModalVisible && (
        <StripeConnect
          visible={isStripeModalVisible}
          onOk={toggleModalValue}
          onCancel={toggleModalValue}
        />
      )} */}
    </ContainerDefault>
  );
};

const connectStateToProps = (state) => {
  return {
    // list: getCurrentProductList(state),
    // stripeId: getUserStripeId(state),
  };
};

export default connect(connectStateToProps)(Authenticated(BlogPage));
