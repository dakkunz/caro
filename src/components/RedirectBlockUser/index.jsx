import useAuth from "@/hooks/useAuth";
import React from "react";
import { Redirect } from "react-router-dom";

const RedirectBlockUser = () => {
	const {
		user: { isLocked },
	} = useAuth();

	if (isLocked) return <Redirect to="/blocked" />;

	return <></>;
};

export default RedirectBlockUser;
