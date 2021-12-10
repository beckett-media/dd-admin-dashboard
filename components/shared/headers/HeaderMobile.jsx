import React from "react";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { logOut } from "~/store/auth/action";
import { isUserAuthenticated } from "~/store/auth/selectors";

const HeaderMobile = ({ isAuthenthicated }) => {
  const dispatch = useDispatch();
  const handleOpenDrawer = () => {
    dispatch(toggleDrawerMenu(true));
  };

  const onLogout = () => {
    dispatch(logOut());
  };

  if (!isAuthenthicated) return <React.Fragment />;

  return (
    <header className="header--mobile">
      <div className="header__left">
        <button className="ps-drawer-toggle" onClick={handleOpenDrawer}>
          <i className="icon icon-menu"></i>
        </button>
        <img src="" alt="" />
      </div>
      <div className="header__center">
        <a className="ps-logo" href="#">
          <img src="/img/logo.png" alt="" />
        </a>
      </div>
    </header>
  );
};

const connectStateToProps = (state) => {
  return {
    isAuthenthicated: isUserAuthenticated(state),
  };
};

export default connect(connectStateToProps)(HeaderMobile);
