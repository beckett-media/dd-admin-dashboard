import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { login } from "../../../store/auth/action";

import {
  Col,
  Layout,
  Button,
  Form,
  Typography,
  Input,
  notification,
  Row,
} from "antd";
import { connect } from "react-redux";
import Title from "~/components/elements/basic/Title";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props) {
    if (props.isLoggedIn === true) {
      Router.push("/");
    }
    return false;
  }

  handleFeatureWillUpdate(e) {
    e.preventDefault();
    notification.open({
      message: "Opp! Something went wrong.",
      description: "This feature has been updated later!",
      duration: 500,
    });
  }

  handleLoginSubmit = (values) => {
    this.props.dispatch(login(values));
  };

  render() {
    return (
      <React.Fragment>
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
          <Layout.Content>
            <Row
              justify="center"
              align="middle"
              style={{ height: "100%", padding: 10 }}
            >
              <Form onFinish={this.handleLoginSubmit}>
                <Col align="center" justify="left">
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
                      <Col align="middle" justify="left" className="mb-5">
                        <Title
                          title="Welcome back"
                          subtitle="Login to your Due Dilly account"
                        />
                      </Col>
                    </Col>
                    <Col xs={24} className="text-left">
                      <label className="text-left">Email</label>

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
                          placeholder="Email address"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} className="text-left">
                      <label className="text-left">Password</label>

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
                            className="form-control"
                            type="password"
                            placeholder="Enter your secure password"
                          />
                      </Form.Item>
                    </Col>
                    <Col xs={24} align="middle" justify="center">
                      <Button className="full" htmlType="submit" type="primary">
                        Sign In
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Row>
          </Layout.Content>
        </Layout>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return state.auth;
};
export default connect(mapStateToProps)(Login);
