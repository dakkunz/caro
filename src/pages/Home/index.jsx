import OnlineUserList from "@/components/OnlineUserList";
import Ranking from "@/pages/Home/Ranking";
import RoomActions from "@/pages/Home/RoomActions";
import RoomList from "@/pages/Home/RoomList";
import React from "react";
// others
import "./style.scss";

const Home = () => (
	<div className="home-wrapper">
		<div className="left">
			<RoomList />
			<RoomActions />
		</div>
		<div className="right">
			<Ranking />
			<OnlineUserList />
		</div>
	</div>
);

export default Home;
