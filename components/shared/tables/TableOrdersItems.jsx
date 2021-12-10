import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Table, Menu } from "antd";
import DropdownAction from "~/components/elements/basic/DropdownAction";
import { CodeSandboxOutlined } from "@ant-design/icons";
const dayjs = require("dayjs");

const TableOrdersItems = (props) => {
  const { orders = [] } = props;
  const [scrollWidth, setScrollWidth] = useState(0);

  let locale = {
    emptyText: (
      <div>
        <CodeSandboxOutlined style={{ fontSize: 50, marginBottom: 20 }} /> <p>NOTHING TO SHOW HERE</p>
      </div>
    ),
  };

  const tableData = orders;
  const tableColumn = [
    {
      title: "Products",
      dataIndex: "listing.title",
      width: "20%",
      rowKey: "title",
      key: "title",
      render: (text, record) => {
        let productTitle = "";

        record.items.forEach(({ title, quantity }) => {
          productTitle += `${title} x ${quantity} \n`;
        });

        return (
          <>
            <small className="text-secondary" style={{ opacity: 0.5 }}>
              {record.orderId}
            </small>
            <div>{productTitle || ""}</div>
          </>
        );
      },
    },
    {
      title: "Price",
      rowKey: "Price",
      dataIndex: "Price",
      key: "Price",
      width: "120px",
      render: (text, record) => <strong>{record?.price ? `$ ${record?.price}` : ""}</strong>,
    },
    {
      title: "Buyer Name",
      rowKey: "dateBuyer",
      dataIndex: "dateBuyer",
      key: "dateBuyer",
      // width: "120px",
      render: (text, record) => {
        return `${record?.buyer?.fullName || "guest"}`;
      },
    },
    {
      title: "Buyer Address",
      rowKey: "dateAddress",
      dataIndex: "dateAddress",
      key: "dateAddress",
      // width: "120px",
      render: (text, record) => {
        return `${record?.buyer?.email || "guest"}`;
      },
    },
    {
      title: "Date",
      rowKey: "dateCreate",
      dataIndex: "dateCreate",
      key: "dateCreate",
      width: "120px",
      render: (text, record) => dayjs(record.createdAt).format("MM-DD-YYYY"),
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      rowKey: "status",
      width: "150px",
      render: (text, record) => {
        let fullfillmentView;
        switch (record.status) {
          case "pending":
            fullfillmentView = <span className="ps-fullfillment warning">Pending</span>;
            break;
          case "Cancel":
            fullfillmentView = <span className="ps-fullfillment danger">Cancel</span>;
            break;
          case "completed":
            fullfillmentView = <span className="ps-fullfillment success">Completed</span>;
            break;
        }
        return fullfillmentView;
      },
    },
  ];
  return (
    <div className="table-responsive">
      <Table className="orders-table"  locale={locale} columns={tableColumn} dataSource={tableData} rowKey={(record) => record.id} />
    </div>
  );
};

export default TableOrdersItems;
