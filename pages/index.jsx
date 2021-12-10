import React, { useEffect } from "react";
import AdminContainerDefault from "~/components/layouts/AdminContainerDefault";

import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import Authenticated from "~/repositories/AuthHoc";


const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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

export default Authenticated(Index);
