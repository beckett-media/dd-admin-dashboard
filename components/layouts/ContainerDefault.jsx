import React from "react";
import Head from "next/head";
import FooterCopyright from "~/components/shared/footers/FooterCopyright";
import MenuSidebar from "~/components/shared/menus/MenuSidebar";
import WidgetUserWelcome from "~/components/shared/widgets/WidgetUserWelcome";
import { Header } from "antd/lib/layout/layout";
import LogoWhite from "../../public/img/logo_white.png";
import { Dropdown, Menu, Row } from "antd";
import {
  PoweroffOutlined,
  CodeSandboxOutlined,
  ProfileOutlined,
  UserOutlined,
  DingdingOutlined,
  FormOutlined,
  DollarOutlined
} from "@ant-design/icons";
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

  const menuItems = [
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
      text: "Blogs",
      url: "/blogs",
      icon: <DingdingOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Press",
      url: "/press",
      icon: <FormOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Promos",
      url: "/coupons",
      icon: <DollarOutlined style={{ fontSize: 20 }} />,
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
              <i
                style={{
                  border: "2px #fff solid",
                  display: "inline-block",
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  textAlign: "center",
                }}
              >
                <UserOutlined
                  style={{
                    color: "#fff",
                    fontSize: 30,
                    display: "block",
                    marginTop: 5,
                  }}
                />
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
          <div
            style={{
              maxWidth: 80,
              position: "absolute",
              top: 50,
              right: 20,
              zIndex: 1,
            }}
          >
            <img style={{ width: "100%" }} src={PixelBg} />
          </div>
          <div
            style={{
              maxWidth: 800,
              position: "absolute",
              bottom: -450,
              right: -100,
              zIndex: 1,
            }}
          >
            <img style={{ width: "100%" }} src={CircleBg} />
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default ContainerDefault;
