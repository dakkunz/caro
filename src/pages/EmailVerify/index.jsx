import { useAuth0 } from "@auth0/auth0-react";
import { Button, Result } from "antd";
import React from "react";
import { Redirect } from "react-router-dom";

const EmailVerify = () => {
	const { logout, user } = useAuth0();
	const { email_verified } = user || {};

	return email_verified ? (
		<Redirect to="/" />
	) : (
		<div className="email-verify-wrapper">
			<Result
				status="warning"
				title="Your account need to be activated"
				subTitle="Login to your email to activate your account"
				extra={
					<Button type="primary" onClick={logout}>
						Log out
					</Button>
				}
			/>
		</div>
	);
};

export default EmailVerify;
