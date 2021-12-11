import React, { useEffect } from "react";
import AdminContainerDefault from "~/components/layouts/AdminContainerDefault";

import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { getCurrentProductList } from "~/store/product/selectors";
import Authenticated from "~/repositories/AuthHoc";
import { getUserStripeId } from "~/store/auth/selectors";
import Router from "next/router";

const AdminPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.role == "admin") {
      Router.replace("/admin");
    } else {
      Router.replace("/products");
    }
    dispatch(toggleDrawerMenu(false));
  }, []);

  return (
    <AdminContainerDefault title="Admin Dashboard">
      <HeaderDashboard
        title="Admin Dashboard"
        description="Due Dilly Admin Dashboard "
      />
    </AdminContainerDefault>
  );
};

export default Authenticated(AdminPage);
