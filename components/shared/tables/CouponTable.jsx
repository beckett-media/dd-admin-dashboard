import React from "react";
import { TableActions } from "~/components/elements/basic/DropdownAction";
import { Table, Pagination } from "antd";
import {
  getCouponListings,
  updateCouponPageNumberAction,
  handleDeleteCouponRequest,
  handleCouponEdit,
} from "~/store/coupon/action";

import { getCouponDeleteLoader } from "~/store/coupon/selectors";
import { CodeSandboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const BlogItems = ({ list = [], pageName }) => {
  const tableData = list;
  let locale = {
    emptyText: (
      <div>
        <CodeSandboxOutlined style={{ fontSize: 50, marginBottom: 20 }} />{" "}
        <p>NOTHING TO SHOW HERE</p>
      </div>
    ),
  };
  const dispatch = useDispatch();
  let totalSize = useSelector((state) => state.coupon.totalCoupon);
  let pagination = useSelector((state) => state.coupon.pagination);

  const tableColumn = [
    {
      title: "Name",
      dataIndex: "Name",
      rowKey: "Name",
      key: "Name",
      render: (text, record) => (
        <>
          <small className="text-secondary" style={{ opacity: 0.5 }}>
            {record.id}
          </small>
          <p>{record.name}</p>
        </>
      ),
    },
    {
      title: "Code",
      dataIndex: "Code",
      rowKey: "Code",
      key: "Code",
      render: (text, record) => (
        <>
          <p>{record.promoCode}</p>
        </>
      ),
    },
    {
      title: "Percentage",
      dataIndex: "Percentage",
      rowKey: "Percentage",
      key: "Percentage",
      render: (text, record) => (
        <>
          <p>{record.percentage}%</p>
        </>
      ),
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      rowKey: "isActive",
      key: "isActive",
      render: (text, record) => (
        <>
          <p>{record.isActive}</p>
        </>
      ),
    },

    {
      title: "Date",
      rowKey: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (text, item) => dayjs(item.updatedAt).format("MM-DD-YYYY"),
    },
    {
      title: "",
      rowKey: "menu",
      dataIndex: "menu",
      key: "menu",
      render: (text, item) => (
        <TableActions
          isPublic={true}
          editDisabled={item.isActive === "false"}
          editAction={handleCouponEdit}
          item={item}
          deleteAction={handleDeleteCouponRequest}
          loaderSelector={getCouponDeleteLoader}
          editPath={`/coupons/edit-coupon/${item._id}`}
        />
      ),
    },
  ];
  return (
    <div className="table-responsive">
      <Table
        className="product-table"
        locale={locale}
        columns={tableColumn}
        dataSource={tableData}
        pagination={false}
        rowKey={(record) => record.id || record._id}
      />

      <Pagination
        current={pagination.page}
        total={totalSize}
        pageSize={2}
        onChange={(page) => {
          dispatch(updateCouponPageNumberAction(page));
          dispatch(getCouponListings(page));
        }}
      />
    </div>
  );
};

export default BlogItems;
