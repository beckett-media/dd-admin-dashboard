import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logOut } from "~/store/auth/action";
import { Button } from "antd";
import {
  CodeSandboxOutlined,
  ShopOutlined,
  PoweroffOutlined,
  ProfileOutlined,
  UserOutlined,
  DingdingOutlined
} from "@ant-design/icons";

const MenuSidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);

  const menuItemsUsers = [
    // {
    //     text: 'Dashboard',
    //     url: '/',
    //     icon: 'icon-home',
    // },
    {
      text: "Listings",
      url: "/products",
      icon: <CodeSandboxOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Stores",
      url: "/stores",
      icon: <ShopOutlined style={{ fontSize: 20 }} />,
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
      text: "Blogs",
      url: "/blogs",
      icon: <DingdingOutlined style={{ fontSize: 20 }} />,
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
      text: "Blogs",
      url: "/blogs",
      icon: <DingdingOutlined style={{ fontSize: 20 }} />,
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

  const menuItems = user?.role === "admin" ? menuItemsAdmin : menuItemsUsers;

  return (
    <ul className="menu">
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={router.pathname === item.url ? "active" : ""}
        >
          {item.url ? (
            <Link href={item.url}>
              <a>
                <i>{item.icon}</i>
                {item.text}
              </a>
            </Link>
          ) : (
            <a onClick={item.action}>
              <i>{item.icon}</i>
              {item.text}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuSidebar;
