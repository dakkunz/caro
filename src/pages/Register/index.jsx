// libs
import useAuth from "@/hooks/useAuth";
import {
	ArrowRightOutlined,
	FacebookFilled,
	GoogleCircleFilled,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// components
// others
import "./styles.scss";

const Register = () => {
	const {
		registerWithUsername,
		loginWithGoogle,
		loginWithFacebook,
	} = useAuth();

	const [loading, setLoading] = useState(false);

	return (
		<div className="register-wrapper">
			<div className="register-wrapper-inner">
				<h1>Sign Up</h1>
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					labelAlign="left"
					scrollToFirstError
					onFinish={({ confirmPassword, ...user }) => {
						setLoading(true);
						registerWithUsername(user, () => setLoading(false));
					}}
				>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Please input your name!" }]}
						hasFeedback
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Username"
						name="userName"
						rules={[{ required: true, message: "Please input your username!" }]}
						hasFeedback
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Please input your email!" },
							{ type: "email", message: "Please input a valid email!" },
						]}
						hasFeedback
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{ required: true, message: "Please input your password!" },
							{ min: 3 },
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="Confirm"
						name="confirmPassword"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please confirm your password!",
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject("Confirm Password not match!");
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						className="btn-login"
					>
						Sign Up
					</Button>
					<div className="btn-social">
						<Button
							type="primary"
							ghost
							icon={<FacebookFilled />}
							onClick={() => {
								setLoading(true);
								loginWithFacebook(() => setLoading(false));
							}}
							loading={loading}
						>
							Sign Up With Facebook
						</Button>
						<Button
							danger
							icon={<GoogleCircleFilled />}
							onClick={() => {
								setLoading(true);
								loginWithGoogle(() => setLoading(false));
							}}
							loading={loading}
						>
							Sign Up With Google
						</Button>
					</div>
					<div className="redirect">
						<div>Already have account?</div>
						<Link to="/login">
							<Button type="link" icon={<ArrowRightOutlined />}>
								Join us now!
							</Button>
						</Link>
					</div>
				</Form>
			</div>
		</div>
	);
};
export default Register;
