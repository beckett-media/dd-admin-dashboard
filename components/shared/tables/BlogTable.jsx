import React from "react";
import { TableActions } from "~/components/elements/basic/DropdownAction";
import { Popconfirm, Table } from "antd";
import {
    createNewProduct,
    handleDeleteProductRequest,
    handleProductEdit,
} from "~/store/product/action";
import { getProductDeleteLoader } from "~/store/product/selectors";
import { CodeSandboxOutlined } from "@ant-design/icons";
import { baseDomain } from "~/repositories/Repository";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

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

    const tableColumn = [
        {
            title: "",
            rowKey: "thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            width: "50px",
            render: (text, item) => (
                <>
                    {item.images?.length > 0 ? (
                        <img width={50} src={baseDomain + "/" + item.images[0]} />
                    ) : (
                        <div style={{ width: 50, height: 75, background: "#ccc" }}></div>
                    )}
                </>
            ),
        },

        // {
        //     title: "Title",
        //     rowKey: "title",
        //     dataIndex: "title",
        //     key: "title",
        //     render: (text, item) => {
        //         let {
        //             grade,
        //             card,
        //             createdAt,
        //             updatedAt,
        //             __v,
        //             id,
        //             availableQuantity,
        //             product,
        //             status,
        //             user,
        //             ...rest
        //         } = item;

        //         return (
        //             <>
        //                 <p className="ps-item-categories m-0">
        //                     {item.players ? item.playerNames.map((tag) => (
        //                         <a key={tag}>{tag}</a>
        //                     )) : ""}
        //                 </p>
        //                 {/* {!item.isPublic && (
        //                     <span className="badge badge-pill badge-secondary p-3 mr-4 mt-3">
        //                         Draft
        //                     </span>
        //                 )} */}
        //                 {!item.isPublic && (
        //                     <Popconfirm
        //                         placement="leftTop"
        //                         title="Are you sure to publish this listing?"
        //                         onConfirm={() =>
        //                             dispatch(
        //                                 createNewProduct(
        //                                     {
        //                                         ...rest,
        //                                         gradeId: grade,
        //                                         productId: product,
        //                                         isPublic: true,
        //                                     },
        //                                     true
        //                                 )
        //                             )
        //                         }
        //                         okText="Yes"
        //                         cancelText="No"
        //                     >
        //                         <a href="#">Publish Listing</a>
        //                     </Popconfirm>
        //                 )}
        //             </>
        //         );
        //     },
        // },
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
                    editAction={handleProductEdit}
                    item={item}
                    deleteAction={handleDeleteProductRequest}
                    loaderSelector={getProductDeleteLoader}
                    editPath={`/blogs/create-blog/${item.id}`}
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
                rowKey={(record) => record.id || record._id}
            />
        </div>
    );
};

export default BlogItems;
