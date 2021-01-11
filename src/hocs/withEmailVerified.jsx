import React from "react";
import { Redirect } from "react-router-dom";

const RedirectComponent = () => <Redirect to="/email-verify" />;

const withEmailVerified = (user) => (Component) => {
	const { email_verified } = user || {};

	return email_verified ? Component : RedirectComponent;
};

export default withEmailVerified;
