import Head from "next/head";
import { Typography, Divider } from "antd";
import { Row, Col, Spin } from "antd";
import stripe from "~/contants/stripe";
import Link from "next/link";
import { LeftOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Stripe = () => {
	return (
		<>
			<Head>
				<script src="https://js.stripe.com/v3/"></script>
			</Head>

			<>
				<Row className="stripediv" justify="center" align="middle" style={{ height: "100vh" }}>
					<Col style={{ textAlign: "center" }}>
						<Spin size="large" />
						<Divider />
						{/* <Text strong>In Order to complete the signup proccess</Text> */}
						<Text strong>In Order to create a new product complete stripe connect process</Text>
						<Divider />
						<a href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${stripe.redirectURl}&client_id=${stripe.stripePk}&state=${stripe.stripeState}`} class="stripe-connect slate">
							<span>Connect with</span>
						</a>
						<Divider />
						{/* <Text strong>You will redirected back to app after the process is completed</Text> */}
						<Text strong>You will redirected back to app after the process is completed</Text>

						<Col xs={24} style={{ marginTop: 10 }}>
							<Row align="middle" justify="center">
								<Link href="/products">
									<a className="ps-btn success">
										<LeftOutlined style={{ fontSize: 20 }} />
										Go to products page
									</a>
								</Link>
							</Row>
						</Col>
					</Col>
				</Row>
			</>
		</>
	);
};

export default Stripe;
