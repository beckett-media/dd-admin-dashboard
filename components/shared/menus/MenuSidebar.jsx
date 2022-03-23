import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logOut } from "~/store/auth/action";
import {
  CodeSandboxOutlined,
  PoweroffOutlined,
  UserOutlined,
  DingdingOutlined,
  FormOutlined,
  DollarOutlined
} from "@ant-design/icons";

const MenuSidebar = () => {
  const router = useRouter();
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
      text: "Promos",
      url: "/coupons",
      icon: <DollarOutlined style={{ fontSize: 20 }} />,
    },
    {
      text: "Press",
      url: "/press",
      icon: <FormOutlined style={{ fontSize: 20 }} />,
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
