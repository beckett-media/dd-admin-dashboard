import React, { useEffect, useState } from "react";
import AdminContainerDefault from "~/components/layouts/AdminContainerDefault";
import TableProjectItems from "~/components/shared/tables/TableProjectItems";

import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { getProductListings } from "~/store/product/action";
import { getUnclaimedStores } from "~/store/store/selectors";
import Authenticated from "~/repositories/AuthHoc";
import { getUserStripeId } from "~/store/auth/selectors";
import StoreItems from "~/components/shared/tables/StoreItems";
import { getUserStores } from "~/store/store/action";

import { useRouter } from "next/router";
import StripeConnect from "~/components/partials/account/StripeConnect";

const UnclaimedAdminStorePage = (props) => {
  const [isStripeModalVisible, setisStripeModalVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleModalValue = () => {
    setisStripeModalVisible((prev) => !prev);
  };

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
    dispatch(getUserStores(true));
  }, []);

  const { list, stripeId } = props;

  const newStore = (event) => {
    event.preventDefault();
    if (!stripeId) toggleModalValue();
    else router.push("/admin/unclaimed-stores/create-store");
  };

  return (
    <AdminContainerDefault title="Unclaimed Stores">
      <HeaderDashboard
        title="Unclaimed Stores"
        description="Due Dilly Unclaimed Stores "
      />
      <div className="ps-section__actions text-right my-5">
        <a className="ps-btn success" onClick={newStore}>
          <i className="icon icon-plus mr-2" />
          Create New Store for Claim
        </a>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__content">
          <StoreItems list={list || []} isAdmin={true} />
        </div>
      </section>

      {isStripeModalVisible && (
        <StripeConnect
          visible={isStripeModalVisible}
          onOk={toggleModalValue}
          onCancel={toggleModalValue}
        />
      )}
    </AdminContainerDefault>
  );
};

const connectStateToProps = (state) => {
  return {
    list: getUnclaimedStores(state),
    stripeId: getUserStripeId(state),
  };
};

export default connect(connectStateToProps)(Authenticated(UnclaimedAdminStorePage));
