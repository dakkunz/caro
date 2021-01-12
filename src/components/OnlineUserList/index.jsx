// libs
import OnlineUserSocket from "@/components/OnlineUserList/OnlineUserSocket";
import useSocket from "@/hooks/useSocket";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Card, List } from "antd";
import React from "react";
// others
import { useSelector } from "react-redux";
import OnlineUserListItem from "./OnlineUserListItem";
import "./style.scss";

const OnlineUserList = ({ withInvite = false }) => {
	const { list } = useSelector((state) => state.onlineUsers);
	const socket = useSocket();

	return (
		<Card
			className="online-user-list-wrapper"
			title={
				<h3 style={{ margin: 0, textAlign: "center" }}>
					Online Users ({list.length})
				</h3>
			}
			size="small"
		>
			<List
				dataSource={list}
				size="small"
				renderItem={(user) => (
					<OnlineUserListItem
						user={user}
						key={user.sub}
						withInvite={withInvite}
					/>
				)}
				rowKey={(user) => user.sub}
			/>
			{socket && <OnlineUserSocket />}
		</Card>
	);
};
export default withAuthenticationRequired(OnlineUserList);
