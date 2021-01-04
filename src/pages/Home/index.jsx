import React from "react";
import RoomList from "@/pages/Home/RoomList";
import RoomActions from "@/pages/Home/RoomActions";
import "./style.scss";

const Home = () => (
	<div className="home-wrapper">
		<RoomList />
		<RoomActions />
	</div>
);

export default Home;
