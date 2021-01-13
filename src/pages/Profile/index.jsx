import { refreshUserInfo } from "@/actions/profile";
import GameHistory from "@/pages/Profile/GameHistory";
import UserInfo from "@/pages/Profile/UserInfo";
import UserTrophy from "@/pages/Profile/UserTrophy";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";

const Profile = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(refreshUserInfo());
	}, [dispatch]);

	return (
		<div className="profile-wrapper">
			<UserTrophy />
			<div className="right">
				<UserInfo />
				<GameHistory />
			</div>
		</div>
	);
};

export default Profile;
