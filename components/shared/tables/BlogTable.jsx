import React from "react";
import { TableActions } from "~/components/elements/basic/DropdownAction";
import { Table, Pagination } from "antd";
import {
  getBlogListings,
  updateBlogPageNumberAction,
  handleDeleteBlogRequest,
  handleBlogEdit,
} from "~/store/blogPost/action";

import {
  getPressListings,
  updatePressPageNumberAction,
  handleDeletePressRequest,
  handlePressEdit,
} from "~/store/pressPost/action";

import { getBlogDeleteLoader } from "~/store/blogPost/selectors";
import { getPressDeleteLoader } from "~/store/pressPost/selectors";
import { CodeSandboxOutlined } from "@ant-design/icons";
import { baseDomain } from "~/repositories/Repository";
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
  let totalSize = useSelector((state) =>
    pageName === "blogs"
      ? state.blogPost.totalBlogs
      : state.pressPost.totalPress
  );
  let pagination = useSelector((state) =>
    pageName === "blogs"
      ? state.blogPost.pagination
      : state.pressPost.pagination
  );

  const tableColumn = [
    {
      title: "Title",
      dataIndex: "Title",
      rowKey: "Title",
      key: "Title",
      width: "25%",
      render: (text, record) => (
        <>
          <small className="text-secondary" style={{ opacity: 0.5 }}>
            {record.id}
          </small>
          <p>{record.title}</p>
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
          isPublic={item.isPublic}
          editDisabled={item.status === "sold"}
          editAction={pageName === "blogs" ? handleBlogEdit : handlePressEdit}
          item={item}
          deleteAction={
            pageName === "blogs"
              ? handleDeleteBlogRequest
              : handleDeletePressRequest
          }
          loaderSelector={
            pageName === "blogs" ? getBlogDeleteLoader : getPressDeleteLoader
          }
          editPath={
            pageName === "blogs"
              ? `/blogs/edit-blog/${item.id}`
              : `/press/edit-press/${item.id}`
          }
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
      {console.log("totalSize")}
      {console.log(totalSize)}
      <Pagination
        current={pagination.page}
        total={totalSize}
        pageSize={2}
        onChange={(page) => {
          console.log(page);
          if (pageName === "blogs") {
            dispatch(updateBlogPageNumberAction(page));
            dispatch(getBlogListings(page));
          } else {
            dispatch(updatePressPageNumberAction(page));
            dispatch(getPressListings(page));
          }
        }}
      />
    </div>
  );
};

export default BlogItems;
