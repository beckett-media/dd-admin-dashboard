import Head from "next/head";
import { Modal, Button, Row, Col, Typography, Spin, Divider } from "antd";
import { useEffect, useState } from "react";
import { getUserStripeId } from "~/store/auth/selectors";
import { useSelector } from "react-redux";
const { default: stripe } = require("~/contants/stripe");
const { Text } = Typography;

const StripeConnect = (props) => {
  const { visible, onOk, onCancel } = props;
  const onATagClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const path = `${window.location.pathname}${window.location.search}`;

    localStorage.setItem("stripe-connect-redirect", path);
    window.location.href = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${stripe.redirectURl}&client_id=${stripe.stripePk}&state=${stripe.stripeState}`;
  };
  return (
    <Modal
      title="Banking Info for Payouts"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" type="outline" onClick={onCancel} style={{ marginRight: 15 }}>
          Cancel
        </Button>,
        <Button key="back" type="primary" onClick={onATagClick}>
          Link Now
        </Button>,
      ]}
    >
      <>
        <Head>
          <script src="https://js.stripe.com/v3/"></script>
        </Head>

        <>
          <Row className="stripediv" justify="center" align="middle">
            <Col style={{ textAlign: "center" }}>
              <Row justify="center" align="middle" gutter={[8, 8]}>
                <Col>
                  <Spin size="large" />
                </Col>
              </Row>

              {/* <Text strong>In Order to complete the signup proccess</Text> */}
              <Text strong>Before listing a product you need to link your bank account in order for us to payout your sales proceeds.</Text>
            </Col>
          </Row>
        </>
      </>
    </Modal>
  );
};

export default StripeConnect;

export const StripeConnectWrapper = ({ checkRef }) => {
  const [isStripeModalVisible, setisStripeModalVisible] = useState(false);
  const stripeId = useSelector(getUserStripeId);

  useEffect(() => {
    checkRef.current = check;
    check();
  }, [stripeId]);

  const check = (callback) => {
    if (!stripeId) return toggleModalValue();
    if (callback) callback();
  };

  const toggleModalValue = () => {
    setisStripeModalVisible((prev) => !prev);
  };

  return isStripeModalVisible ? <StripeConnect visible={isStripeModalVisible} onOk={toggleModalValue} onCancel={toggleModalValue} /> : <></>;
};
