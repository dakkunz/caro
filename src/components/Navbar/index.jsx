// libs
import { Avatar, Dropdown, Menu } from "antd";
import React from "react";
// others
import "./styles.scss";
import useSocket from "@/hooks/useSocket";
import { useHistory } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
	const { user, logout } = useAuth();
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
							<Menu.Item onClick={() => push("/profile")}>Thông tin tài khoản</Menu.Item>
							<Menu.Item onClick={submitLogout}>Đăng xuất</Menu.Item>
						</Menu>
					}
					placement="bottomCenter"
					trigger={["click"]}
				>
					<div className="user-display">
						<div>{user.displayName || user.name}</div>
						<Avatar src={user.picture} shape="circle" />
					</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default Navbar;
