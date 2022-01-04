import React from "react";
import { TableActions } from "~/components/elements/basic/DropdownAction";
import { Table, Pagination } from "antd";
import {
  getBlogPressListings,
  updatePageNumberAction,
  handleDeleteBlogPressRequest,
  handleBlogEdit
} from "~/store/blogPress/action";
import { getBlogDeleteLoader } from "~/store/blogPress/selectors";
import { CodeSandboxOutlined } from "@ant-design/icons";
import { baseDomain } from "~/repositories/Repository";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const BlogItems = ({ list = [] }) => {
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
  let totalSize = useSelector((state) => state.blogPress.totalBlogs);
  let pagination = useSelector((state) => state.blogPress.pagination);

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
          editAction={handleBlogEdit}
          item={item}
          deleteAction={handleDeleteBlogPressRequest}
          loaderSelector={getBlogDeleteLoader}
          editPath={`/blogs/edit-blog/${item.id}`}
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
          dispatch(updatePageNumberAction(page));
          dispatch(getBlogPressListings(page));
        }}
      />
    </div>
  );
};

export default BlogItems;
