import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import FooterCopyright from "~/components/shared/footers/FooterCopyright";
import MenuSidebar from "~/components/shared/menus/MenuSidebar";
import WidgetUserWelcome from "~/components/shared/widgets/WidgetUserWelcome";
import { Header } from "antd/lib/layout/layout";
import LogoWhite from "../../public/img/logo_white.png";
import { Dropdown, Menu, Row } from "antd";
import { PoweroffOutlined, CodeSandboxOutlined, ProfileOutlined, UserOutlined, ShoppingOutlined } from "@ant-design/icons";
import CircleBg from "../../public/img/circle_bg.png";
import PixelBg from "../../public/img/pixel_bg.png";
import { useDispatch } from "react-redux";
import { logOut } from "~/store/auth/action";
import { appName, marketplaceURL } from "~/repositories/Repository";
import SimpleCrypto from "simple-crypto-js";
var simpleCrypto = new SimpleCrypto("myTotalySecretKey");


const ContainerDefault = ({ children, title }) => {
  let titleView;
  if (title !== undefined) {
    titleView = process.env.title + " | " + title;
  } else {
    titleView = process.env.title + " | " + process.env.titleDescription;
  }
  const dispatch = useDispatch();
  let user = useSelector((state)=>state.auth.user)

  const menuItemsUsers = [
    {
      text: "Listings",
      url: "/products",
      icon: <CodeSandboxOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Orders",
      url: "/orders",
      icon: <ProfileOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Snapscore Orders",
      url: "/snapscore-orders",
      icon: <ProfileOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Profile",
      url: "/profile",
      icon: <UserOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Switch to Buying",
      action: (e) => {
        e.preventDefault()
        let data = JSON.stringify({
          xAuthToken: localStorage.getItem(`${appName}_xAuthToken`),
          refreshToken: localStorage.getItem(`${appName}_refreshToken`),
        })
        var encryptedData = simpleCrypto.encrypt(data);
        window.location.href = `${marketplaceURL}/?auth=${encodeURIComponent(encryptedData)}`
      },
      icon: <ShoppingOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Logout",
      action: (e) => {
        e.preventDefault();
        dispatch(logOut());
      },
      icon: <PoweroffOutlined style={{ fontSize: 20 }} />,
    },
  ];

  const menuItemsAdmin = [
    {
      text: "Unclaimed Stores",
      url: "/admin/unclaimed-stores",
      icon: <CodeSandboxOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Profile",
      url: "/profile",
      icon: <UserOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Logout",
      action: (e) => {
        e.preventDefault();
        dispatch(logOut());
      },
      icon: <PoweroffOutlined style={{ fontSize: 20 }} />,
    },
  ];

  const menuItems = user?.role === "admin" ?  menuItemsAdmin : menuItemsUsers

  const menu = (
    <Menu className="dark-menu">
      <div style={{ padding: "10px 20px" }}>
        <WidgetUserWelcome dark={true} />
      </div>
      <hr color="#fff" style={{ opacity: 0.5 }} />

      {menuItems.map(({ text, url, icon, action }) => (
        <Menu.Item key={text}>
          <a {...(url ? { href: url } : action ? { onClick: action } : {})}>
            <i style={{ marginRight: 20 }}>{icon}</i>
            {text}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="martfury-admin">
      <Head>
        <title>{titleView}</title>
      </Head>
      <Header style={{ position: "fixed", zIndex: 1000, width: "100%" }}>
        <Row justify="space-between" align="middle">
          <div className="logo">
            <img style={{ maxWidth: 150 }} src={LogoWhite} />
          </div>
          <div style={{ display: "inherit" }}>
            <Dropdown overlay={menu} placement="bottomLeft">
              <i style={{ border: "2px #fff solid", display: "inline-block", width: 40, height: 40, borderRadius: 50, textAlign: "center" }}>
                <UserOutlined style={{ color: "#fff", fontSize: 30, display: "block", marginTop: 5 }} />
              </i>
            </Dropdown>
          </div>
        </Row>
      </Header>
      <main className="ps-main">
        <div className="ps-main__sidebar">
          <div className="ps-sidebar">
            <div className="ps-sidebar__top">
              <WidgetUserWelcome />
            </div>
            <div className="ps-sidebar__content">
              <div className="ps-sidebar__center">
                <MenuSidebar />
              </div>
            </div>
            <div className="ps-sidebar__footer">
              <FooterCopyright />
            </div>
          </div>
        </div>
        <div className="ps-main__wrapper">
          <div style={{ maxWidth: 80, position: "absolute", top: 50, right: 20, zIndex: 1 }}>
            <img style={{ width: "100%" }} src={PixelBg} />
          </div>
          <div style={{ maxWidth: 800, position: "absolute", bottom: -450, right: -100, zIndex: 1 }}>
            <img style={{ width: "100%" }} src={CircleBg} />
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default ContainerDefault;
