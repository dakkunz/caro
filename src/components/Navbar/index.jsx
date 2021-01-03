// libs
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Dropdown, Menu } from "antd";
import React from "react";
// others
import "./styles.scss";
import useSocket from "@/hooks/useSocket";
import { useHistory } from "react-router-dom";

const Navbar = () => {
	const { user, logout } = useAuth0();
	const socket = useSocket();
	const { push } = useHistory();
	const submitLogout = () => {
		logout();
		socket.disconnect();
	};
	return (
		<div className="navbar-wrapper">
			<div className="left">
				<h1>CARONA</h1>
			</div>
			<div className="right">
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item onClick={() => push("/profile")}>Profile</Menu.Item>
							<Menu.Item onClick={submitLogout}>Logout</Menu.Item>
						</Menu>
					}
					placement="bottomCenter"
					trigger={["click"]}
				>
					<div className="user-display">
						<div>{user.nickname}</div>
						<Avatar src={user.picture} shape="circle" />
					</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default Navbar;
