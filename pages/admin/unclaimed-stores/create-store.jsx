import React, { useRef } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { Input, Form, Row, Select, Spin, Col, InputNumber } from "antd";
import PicturesWallStore from "~/components/shared/upload/PicturesWallStore";
import { createNewStore } from "~/store/store/action";
import { getProductCreateLoading } from "~/store/store/selectors";
import { useRouter } from "next/router";
import AuthHoc from "~/repositories/AuthHoc";
import { StripeConnectWrapper } from "~/components/partials/account/StripeConnect";

const { Option } = Select;

const CreateStorePage = (props) => {
  const checkRef = useRef();

  const { query = {}, ...router } = useRouter();

  const formRef = useRef();

  const dispatch = useDispatch();

  const { isLoading = false } = props;

  const handleProductSubmit = (values) => {
    const isEdit = Boolean(values._id);
    dispatch(createNewStore(values, isEdit, true));
  };

  const onSavePublic = (event) => {
    event.preventDefault();
    event.stopPropagation();
    formRef.current.setFieldsValue({ isPublic: true });
    if (checkRef.current) checkRef.current(() => formRef.current.submit());
    else formRef.current.submit();
  };

  const handleProductImageDelete = (value) => {
    dispatch(handleProductImageDeleteRequest(value));
  };

  return (
    <ContainerDefault title={"Create new store for claiming"}>
      <HeaderDashboard
        title={"Create Store for inviting user"}
        description={`Due Dilly Create New Store`}
      />
      <section className="ps-new-item">
        <Form
          ref={formRef}
          className="ps-form ps-form--new-product"
          onFinish={handleProductSubmit}
          scrollToFirstError={true}
          layout="vertical"
        >
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <div className="ps-block__content">
                    <div style={{ display: "none" }} className="form-group">
                      <Form.Item name="_id" rules={[{ required: false }]}>
                        <Input className="form-control" />
                      </Form.Item>
                    </div>

                    <div style={{ display: "none" }} className="form-group">
                      <Form.Item name="isPublic" rules={[{ required: false }]}>
                        <Input className="form-control" />
                      </Form.Item>
                    </div>

                    <div className="form-group">
                      <Form.Item
                        label="Store title"
                        name="title"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a store title/name.",
                          },
                          {
                            max: 255,
                            message:
                              "The title can be a maximum of 255 characters",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={1}
                          showCount={true}
                          onPressEnter={(e) => e.preventDefault()}
                          maxLength={255}
                          className="form-control"
                          type="text"
                          placeholder="Enter store name"
                        />
                      </Form.Item>
                    </div>
                    
                    <div className="form-group">
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: false,
                            message: "Please input your email!",
                          },
                        ]}
                      >
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Eg. johndoe@gmail.com"
                        />
                      </Form.Item>
                    </div>

                    <div className="form-group">
                      <Form.Item
                        label="Contact Number"
                        name="phoneNumber"
                        rules={[
                          {
                            required: false,
                            message: "Please enter a number.",
                          },
                          {
                            max: 15,
                            message:
                              "The phone can be a maximum of 15 characters",
                          },
                        ]}
                      >
                        <Input
                          rows={1}
                          showCount={true}
                          onPressEnter={(e) => e.preventDefault()}
                          maxLength={19}
                          className="form-control"
                          type="text"
                          placeholder="Enter phone number"
                        />
                      </Form.Item>
                    </div>

                    <div className="form-group">
                      <Form.Item
                        label="Store address"
                        name="address"
                        rules={[
                          {
                            required: false,
                            message: "Please enter a store address.",
                          },
                          {
                            max: 500,
                            message:
                              "The address can be a maximum of 500 characters",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={1}
                          showCount={true}
                          onPressEnter={(e) => e.preventDefault()}
                          maxLength={500}
                          className="form-control"
                          type="text"
                          placeholder="Enter store address"
                        />
                      </Form.Item>
                    </div>

                    <div className="form-group">
                      <Form.Item
                        label="Store Description"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Description",
                          },
                          {
                            max: 500,
                            message:
                              "The description can be a maximum of 500 characters",
                          },
                        ]}
                      >
                        <Input.TextArea
                          showCount={true}
                          maxLength={500}
                          rows={6}
                          className="form-control"
                          type="text"
                          placeholder="Enter brief store description"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>Store Logo</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <div className="form-group--nest">
                        <Form.Item
                          name="images"
                          rules={[
                            {
                              required: false,
                              message: "Add Images",
                            },
                          ]}
                        >
                          <PicturesWallStore
                            handleProductImageDelete={handleProductImageDelete}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>

            <Row align="middle" justify="space-between">
              <Col>
                <div className="ps-form__bottom">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      router.replace("/stores");
                    }}
                    className="ps-btn ps-btn--gray"
                  >
                    Cancel
                  </button>
                </div>
              </Col>
              <Col>
                <Row align="middle">
                  <Col>
                    <div>
                      {!isLoading ? (
                        <button
                          disabled={isLoading}
                          className="ps-btn success"
                          onClick={onSavePublic}
                        >
                          Create
                        </button>
                      ) : (
                        <Spin />
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </section>
      {<StripeConnectWrapper checkRef={checkRef} />}
    </ContainerDefault>
  );
};

const connectStateToProps = (state) => {
  return {
    isLoading: getProductCreateLoading(state),
  };
};

export default connect(connectStateToProps)(AuthHoc(CreateStorePage));
