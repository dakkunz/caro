// libs
import OnlineUserListItem from "./OnlineUserListItem";
import { Card, List } from "antd";
import React from "react";
// others
import { useSelector } from "react-redux";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import "./style.scss";

const OnlineUserList = () => {
	const { list } = useSelector((state) => state.onlineUsers);

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
				renderItem={(user) => <OnlineUserListItem user={user} key={user.sub} />}
				rowKey={(user) => user.sub}
			/>
		</Card>
	);
};
export default withAuthenticationRequired(OnlineUserList);
