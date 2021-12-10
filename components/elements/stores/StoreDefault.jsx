import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { baseDomain } from "~/repositories/Repository";
import { EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { handleStoreDelete } from "~/store/store/action";
import { notification } from "antd";

const StoreDefault = ({ source, isAdmin }) => {
  let disptach = useDispatch();
  const onDeleteConfirmCLick = (storeId) => {
    disptach(handleStoreDelete(storeId, isAdmin));
  };

  return (
    <article className="ps-block--store-2">
      <div
        className="ps-block__content bg--cover"
        style={{
          background: `url('/img/store/default-store-banner.png')`,
        }}
      >
        <figure>
          <h3
            style={{
              marginBottom: "70px",
            }}
          >
            {!isAdmin ? (
              <>
                <Link href="/store/[slug]" as={`/store/${source.id}`}>
                  <a>{source.title}</a>
                </Link>
                <br></br>
                <a
                  href={`https://marketplace.duedilly.co/store/${source.id}`}
                  className="ps-btn"
                  target="_blank"
                  style={{
                    borderRadius: "30px",
                    marginTop: "10px",
                    color: "#fff",
                    backgroundColor: "#37C4CE",
                  }}
                >
                  Visit Store Front
                </a>
              </>
            ) : (
              <span>
                <a>{source.title}</a>
              </span>
            )}
          </h3>

          <p>{source.desc || "No Description found."}</p>
        </figure>
      </div>
      <div className="ps-block__author">
        {!isAdmin ? (
          <a
            className="ps-block__user"
            href={`/store/${source.id}`}
            style={{
              backgroundImage: `url('${`${
                source.images.length > 0
                  ? `${baseDomain}/${source.images[0]}`
                  : "/img/store/vendor-150x150.jpg"
              }`}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
            }}
          ></a>
        ) : (
          <span
            className="ps-block__user"
            href={`/store/${source.id}`}
            style={{
              backgroundImage: `url('${`${
                source.images.length > 0
                  ? `${baseDomain}/${source.images[0]}`
                  : "/img/store/vendor-150x150.jpg"
              }`}')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50% 50%",
            }}
          ></span>
        )}
        <Popconfirm
          title="Are you sure to delete this store?"
          onConfirm={() => onDeleteConfirmCLick(source.id)}
          okText="Yes"
          cancelText="No"
        >
          <i className="icon-trash2 mr-2"></i>
        </Popconfirm>
        {isAdmin ? (
          <span>
            <a
              className="ps-btn"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://marketplace.duedilly.co/unclaimed?claim=${source.id}`
                );
                notification.success({
                  message: "Invite link copied",
                });
              }}
            >
              Copy Invite Link
            </a>
          </span>
        ) : (
          <>
            <Link href="/store/edit/[slug]" as={`/store/edit/${source.id}`}>
              <EditOutlined className="ps-btn" />
            </Link>

            <Link href="/store/[slug]" as={`/store/${source.id}`}>
              <a className="ps-btn">Visit Products</a>
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default StoreDefault;
