import React, { useEffect, useState, useRef } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import FormAccountSettings from "~/components/shared/forms/FormAccountSettings";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import BlogPresBannerUpload from "~/components/shared/upload/BlogPresBannerUpload";
import { getUserInfo } from "~/store/auth/selectors";
import Authenticated from "~/repositories/AuthHoc";
import { Editor } from "@tinymce/tinymce-react";
import CouponRepository from "~/repositories/CouponRepository";
import {
  Input,
  Form,
  Row,
  Select,
  Spin,
  Col,
  InputNumber,
  notification,
} from "antd";
import { PercentageOutlined } from "@ant-design/icons";
import AuthHoc from "~/repositories/AuthHoc";
import { useRouter } from "next/router";

import Router from "next/router";

const NewCoupon = (props) => {
  const formRef = useRef();
  const router = useRouter();
  const checkRef = useRef();

  const onSavePublic = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (checkRef.current) checkRef.current(() => formRef.current.submit());
    else formRef.current.submit();
  };
  const handleCouponSubmit = async (values) => {
    try {
      const data = await CouponRepository.createCoupon({ ...values });
      notification.success({
        message: "Coupon Created",
        description: data.name,
      });
      Router.push("/coupons");
    } catch (error) {
      notification.error({ message: "Error", description: error });
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);
  return (
    <ContainerDefault title={"Create new Promo for discount"}>
      <HeaderDashboard
        title={"Create Promos for user"}
        description={`Due Dilly Create New Promos`}
      />
      <section className="ps-new-item">
        <Form
          ref={formRef}
          className="ps-form ps-form--new-product"
          onFinish={handleCouponSubmit}
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
                        label="Promo Title"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Promo title/name.",
                          },
                          {
                            max: 20,
                            message:
                              "The title can be a maximum of 20 characters",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={1}
                          showCount={true}
                          onPressEnter={(e) => e.preventDefault()}
                          maxLength={20}
                          className="form-control"
                          type="text"
                          placeholder="Enter Promo name"
                        />
                      </Form.Item>
                    </div>

                    <div className="form-group">
                      <Form.Item
                        label="Promo Code"
                        name="promoCode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a Promo Code.",
                          },
                          {
                            max: 20,
                            message:
                              "The Promo Code can be a maximum of 20 characters",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={1}
                          showCount={true}
                          onPressEnter={(e) => e.preventDefault()}
                          maxLength={20}
                          className="form-control"
                          type="text"
                          size="large"
                          placeholder="Enter Promo Code"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <Form.Item
                        label="Promo Percentage"
                        name="percentage"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please enter a Promo Percentage for Discount.",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          prefix="$"
                          rows={1}
                          showCount={true}
                          onPressEnter={(e) => e.preventDefault()}
                          maxLength={20}
                          className="form-control"
                          type="number"
                          placeholder="Enter Promo Code Percentage"
                        />
                      </Form.Item>
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
                      router.replace("/coupons");
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
                      <button className="ps-btn success" onClick={onSavePublic}>
                        Create
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </section>
    </ContainerDefault>
  );
};

//   return (
//     <ContainerDefault title="New Blog">
//       <HeaderDashboard
//         title="New Blog"
//         description="Write from your heart in Due Dilly Blog"
//       />
//       <Col xs={24} sm={12} md={12}>
//         <div className="form-group">
//           <Input.TextArea
//             style={{ width: "100%" }}
//             value={title}
//             className="form-control"
//             type="text"
//             onChange={(e) => {
//               setTitle(e.target.value);
//             }}
//             showCount={true}
//             maxLength={60}
//             placeholder="Title goes here..."
//           />
//         </div>
//       </Col>
//       <BlogPresBannerUpload setBannerImage={setBannerImage} />
//       <Editor
//         init={init}
//         onEditorChange={setBlogPressData}
//         apiKey="7do9gdezf8u4fuujriwhqjhevhjixd1v0yuq2zy97gzt8o13"
//       />
//       <span>
//         <a
//           className="ps-btn"
//           onClick={async () => {
//             try {
//               const { data } = await blogPressRepo.createBlogPress({
//                 title,
//                 bannerImage,
//                 data: blogPressData,
//                 type: "blog",
//               });
//               notification.success({
//                 message: "Published",
//                 description: data.title,
//               });
//               Router.push("/blogs");
//             } catch (error) {
//               notification.error({ message: "Error", description: error });
//             }
//           }}
//         >
//           Save Promo
//         </a>
//       </span>
//     </ContainerDefault>
//   );
// };

const connectStateToProps = (state) => {
  return {
    userInfo: getUserInfo(state),
  };
};

// export default connect(connectStateToProps)(Authenticated(SettingsPage));
export default connect(connectStateToProps)(AuthHoc(NewCoupon));
