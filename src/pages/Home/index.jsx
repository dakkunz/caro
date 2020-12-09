// libs
import OnlineUserList from "@/components/FloatButton/mains/OnlineUserList";
import useAuth from "@/hooks/useAuth";
import useOnlineListener from "@/hooks/useOnlineListener";
import { Avatar, Button } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const Home = () => {
	const {
		logout,
		user: { userId, name, email, image },
	} = useAuth();

	const  {emitOffline} = useOnlineListener();

	const submitLogout = () => {
		logout();
		emitOffline(userId);
	}

	return (
		<div className="home-wrapper">
			<div>
				Welcome, {name} - {email}
			</div>
			<Avatar src={image} shape="circle" />
			<div>
				<Button onClick={submitLogout}>Logout</Button>
			</div>

			<div>
				<OnlineUserList />
			</div>
		</div>
	);
};
export default Home;
