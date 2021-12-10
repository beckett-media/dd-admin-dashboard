import React, { useEffect } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import FormAccountSettings from "~/components/shared/forms/FormAccountSettings";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import AvatarUpload from "~/components/shared/upload/AvatharUpload";
import { getUserInfo } from "~/store/auth/selectors";
import Authenticated from "~/repositories/AuthHoc";

const SettingsPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  const { userInfo = {} } = props;

  const profilePhoto = userInfo?.profilePicture;

  return (
    <ContainerDefault title="Profile">
      <HeaderDashboard title="Profile" description="Your Due Dilly Profile" />
      <section className="ps-dashboard ps-items-listing">
        <div className="ps-section__left">
          <section className="ps-card">
            <div className="ps-card__content">
              <FormAccountSettings userInfo={userInfo} />
            </div>
          </section>
        </div>
        <div className="ps-section__right" style={{ display: "flex", justifyContent: "center" }}>
          <AvatarUpload profilePhoto={profilePhoto} />
        </div>
      </section>
    </ContainerDefault>
  );
};

const connectStateToProps = (state) => {
  return {
    userInfo: getUserInfo(state),
  };
};

export default connect(connectStateToProps)(Authenticated(SettingsPage));
