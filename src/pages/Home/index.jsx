import React from "react";
import RoomList from "@/pages/Home/RoomList";
import RoomActions from "@/pages/Home/RoomActions";
import OnlineUserList from "@/pages/Home/OnlineUserList";
import "./style.scss";

const Home = () => (
	<div className="home-wrapper">
		<RoomList />
		<OnlineUserList />
		<RoomActions />
	</div>
);

export default Home;
