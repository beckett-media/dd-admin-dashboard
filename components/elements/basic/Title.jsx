import { Typography } from "antd";
import React from "react";
const Title = ({ title, subtitle }) => {
  return (
    <div className="main-title">
      <Typography.Title className="text-left">{title}</Typography.Title>
      <Typography.Title className="text-left text-shadow">{title}</Typography.Title>
      <Typography className="text-secondary text-left mt-5">{subtitle}</Typography>
    </div>
  );
};

export default Title;
