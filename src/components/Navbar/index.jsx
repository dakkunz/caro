// libs
import useAuth from "@/hooks/useAuth";
import useOnlineListener from "@/hooks/useOnlineListener";
import { Avatar, Button } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const Navbar = () => {
	const { logout, user } = useAuth();
	const { socket } = useOnlineListener();

	const submitLogout = () => {
		logout();
		socket.disconnect();
	};
	return (
		<div className="navbar-wrapper">
			Welcome, {user.name} - {user.email}
			<Avatar src={user.image} shape="circle" />
			<Button onClick={submitLogout}>Logout</Button>
		</div>
	);
};

export default Navbar;
