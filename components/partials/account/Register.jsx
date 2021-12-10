import React, { Component } from "react";
import Link from "next/link";

import { register } from "../../../store/auth/action";
import { Col, Layout, Button, Form, Typography, Input, Row } from "antd";
import { connect } from "react-redux";
import Title from "~/components/elements/basic/Title";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { withRouter } from "next/router";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    this.props.dispatch(
      register({ ...values, claimStoreId: this.props.router.query.claim })
    );
  };

  onFinishFailed = (errorInfo) => {};

  render() {
    // const router = useRouter()
    return (
      <React.Fragment>
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
          <Layout.Content>
            <Row
              justify="center"
              align="middle"
              style={{ height: "100%", padding: 10 }}
            >
              <Form
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                <Col align="middle" justify="center">
                  <Row gutter={[8, 8]} className="auth-container">
                    <Col xs={24} className="text-left my-5">
                      <a className="ps-logo" href="#">
                        <img
                          style={{ width: 150 }}
                          src="/img/logo.png"
                          alt=""
                        />
                      </a>
                    </Col>
                    <Col xs={24}>
                      <Col align="middle" justify="center" className="mb-5">
                        <Title
                          title="Create Account"
                          subtitle="Create a Due Dilly Account"
                        />
                      </Col>
                    </Col>
                    <Col xs={24} className="text-left">
                      <label>Full Name</label>

                      <Form.Item
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your fullName!",
                          },
                        ]}
                      >
                        <Input
                          className="form-control"
                          type="string"
                          placeholder="Full Name"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} className="text-left">
                      <label>Email</label>

                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
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
                    </Col>
                    <Col xs={24} className="text-left">
                      <label>Password</label>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          className="form-control"
                          type="password"
                          placeholder="Please enter a secure password"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} align="middle" justify="center">
                      <Button className="full" htmlType="submit" type="primary">
                        Sign Up
                      </Button>
                    </Col>
                    <Col xs={24}>
                      <Row align="middle" justify="center">
                        <Typography style={{ marginRight: 5 }}>
                          Already have an account?{" "}
                        </Typography>
                        <Link href="/account/login">
                          <a>Sign In</a>
                        </Link>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Row>
          </Layout.Content>
        </Layout>
      </React.Fragment>
    );

    return (
      <div className="ps-my-account">
        <div className="container">
          <Form
            className="ps-form--account"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <ul className="ps-tab-list">
              <li>
                <Link href="/account/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className="active">
                <Link href="/account/register">
                  <a>Register</a>
                </Link>
              </li>
            </ul>
            <div className="ps-tab active" id="register">
              <div className="ps-form__content">
                <h5>Register An Account</h5>
                <div className="form-group">
                  <Form.Item
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your fullName!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="string"
                      placeholder="Full Name"
                    />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="email"
                      placeholder="Email address"
                    />
                  </Form.Item>
                </div>
                <div className="form-group form-forgot">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Password..."
                    />
                  </Form.Item>
                </div>
                <div className="form-group submit">
                  <button
                    type="submit"
                    htmlType="submit"
                    className="ps-btn ps-btn--fullwidth"
                  >
                    Register
                  </button>
                </div>
              </div>
              <div className="ps-form__footer">
                <p>Connect with:</p>
                <ul className="ps-list--social">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="google" href="#">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="instagram" href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.auth;
};
export default withRouter(connect(mapStateToProps)(Register));
