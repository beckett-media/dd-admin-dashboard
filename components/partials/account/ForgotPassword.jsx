import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { forgotpasswordrequests, login } from "../../../store/auth/action";

import { Col, Layout, Button, Form, Typography, Input, Spin, Row } from "antd";
import { connect } from "react-redux";
import MaskedInput from "input-masked-react";
import Title from "~/components/elements/basic/Title";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: true,
      otp: false,
      forgotpassword: false,
    };
  }

  handleSubmit = (values) => {
    try {
      const { dispatch } = this.props;
      this.setState({ loading: true });
      const data = { ...this.state.values, ...values };

      if (values.email) dispatch(forgotpasswordrequests("send-otp", data, (error) => (error ? this.setState({ loading: false }) : this.setState((prev) => ({ otp: true, loading: false, values: data })))));

      if (values.otp) dispatch(forgotpasswordrequests("verify-otp", data, (error) => (error ? this.setState({ loading: false }) : this.setState((prev) => ({ forgotpassword: true, loading: false, values: data })))));

      if (values.newPassword)
        dispatch(
          forgotpasswordrequests("newpassword", data, (error) => {
            if (error) this.setState({ loading: false });
            else {
              this.setState({ loading: false });
              Router.push("/account/login");
            }
          })
        );
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, otp, forgotpassword, loading } = this.state;
    return (
      <React.Fragment>
        <Layout style={{ height: "100vh", backgroundColor: "#fff" }}>
          <Layout.Content>
            <Row justify="center" align="middle" style={{ height: "100%", padding: 10 }}>
              <Form onFinish={this.handleSubmit}>
                <LayoutWrapper {...{ otp, forgotpassword, loading }}>
                  {email && !otp && (
                    <Col xs={24}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                        ]}
                      >
                        <Input className="form-control" type="text" placeholder="Email address" />
                      </Form.Item>
                    </Col>
                  )}
                  {email && otp && !forgotpassword && (
                    <Col xs={24} className="d-flex justify-content-center align-items-center otp">
                      <Form.Item
                        name="otp"
                        rules={[
                          {
                            required: true,
                            message: "Please input otp!",
                          },
                        ]}
                      >
                        <MaskedInput
                          isNumeric
                          inputStyle={{
                            border: "1px solid #DFE0E3",
                            // borderBottom:
                            // ,
                            width: 30,
                            height: 30,
                          }}
                          numInputs={6}
                          separator={<span>&nbsp;&nbsp;</span>}
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {email && otp && forgotpassword && (
                    <Col xs={24}>
                      <Form.Item
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please input newpassword!",
                          },
                        ]}
                      >
                        <Input className="form-control" type="text" label="New Password" placeholder="Enter New Password" />
                      </Form.Item>
                    </Col>
                  )}
                </LayoutWrapper>
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
export default connect(mapStateToProps)(ForgotPassword);

const LayoutWrapper = (props) => {
  const { otp, forgotpassword, loading } = props;
  return (
    <Col align="middle" justify="center">
      <Row gutter={[8, 8]} className="auth-container">
        <Col xs={24} className="text-left my-5">
          <a className="ps-logo" href="#">
            <img style={{ width: 150 }} src="/img/logo.png" alt="" />
          </a>
        </Col>
        <Col xs={24}>
          <Col align="middle" justify="center" className="mb-5">
            <Title
              title={forgotpassword ? "Enter New Password" : otp ? "Enter OTP" : "Forgot Password"}
              subtitle={forgotpassword ? "Set a new secure password." : otp ? "Enter the OTP you received on your email for verification." : "Enter the email associated with your account and we’ll send an email with instructions to reset your password."}
            />
          </Col>
        </Col>
        {props.children}

        {loading ? (
          <Col xs={24} align="middle" justify="center">
            <Spin />
          </Col>
        ) : (
          <>
            <Col xs={24} align="middle" justify="center">
              <Button className="full" htmlType="submit" type="primary">
                {forgotpassword ? "Set New Password" : otp ? "Verify OTP" : "Send Instructions"}
              </Button>
            </Col>
            <Col xs={24}>
              <Row align="middle" justify="center">
                <Typography style={{ marginRight: 5 }}>Already have an account?</Typography>
                <Link href="/account/login">
                  <a>Sign In</a>
                </Link>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </Col>
  );
};
