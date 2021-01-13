// libs
import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import { Avatar, Dropdown, Menu } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
// others
import "./styles.scss";

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
				<Link to="/">
					<h1>CARONA</h1>
				</Link>
			</div>
			<div className="right">
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item onClick={() => push("/profile")}>
								Thông tin tài khoản
							</Menu.Item>
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
