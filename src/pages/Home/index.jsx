// libs
import OnlineUserList from "@/components/FloatButton/mains/OnlineUserList";
import useAuth from "@/hooks/useAuth";
import { Avatar, Button } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const Home = () => {
	const {
		logout,
		user: { name, email, image },
	} = useAuth();
	return (
		<div className="home-wrapper">
			<div>
				Welcome, {name} - {email}
			</div>
			<Avatar src={image} shape="circle" />
			<div>
				<Button onClick={logout}>Logout</Button>
			</div>

			<div>
				<OnlineUserList />
			</div>
		</div>
	);
};
export default Home;
