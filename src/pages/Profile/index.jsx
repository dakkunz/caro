import UserInfo from "@/pages/Profile/UserInfo";
import UserTrophy from "@/pages/Profile/UserTrophy";
import React from "react";
import "./style.scss";

const Profile = () => (
	<div className="profile-wrapper">
		<UserTrophy />
		<UserInfo />
	</div>
);

export default Profile;
