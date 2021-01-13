import { refreshUserInfo } from "@/actions/profile";
import OnlineUserList from "@/components/OnlineUserList";
import Ranking from "@/pages/Home/Ranking";
import RoomActions from "@/pages/Home/RoomActions";
import RoomList from "@/pages/Home/RoomList";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// others
import "./style.scss";

const Home = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(refreshUserInfo());
	}, [dispatch]);
	return (
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
};

export default Home;
