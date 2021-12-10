import React from "react";
import StoreDefault from "~/components/elements/stores/StoreDefault";
import { CodeSandboxOutlined } from "@ant-design/icons";

const TableStoreItems = ({ list = [], isAdmin }) => {
  let locale = {
    emptyText: (
      <div>
        <CodeSandboxOutlined style={{ fontSize: 50, marginBottom: 20 }} />{" "}
        <p>NOTHING TO SHOW HERE</p>
      </div>
    ),
  };
  let storesItemsView;

  if (list) {
    storesItemsView = list.map((item) => (
      <div
        className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 "
        key={item.id}
      >
        <StoreDefault source={item} isAdmin={isAdmin} />
      </div>
    ));
  } else {
    storesItemsView = <p>No store found.</p>;
  }

  return (
    <div className="ps-page--single ps-page--vendor">
      <section className="ps-store-list">
        <div className="container">
          <div className="ps-section__content">
            <div className="ps-section__search row">
              <div className="col-md-4"></div>
            </div>
            <div className="ps-stores-items row">{storesItemsView}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TableStoreItems;
