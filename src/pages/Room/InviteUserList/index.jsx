// libs
import useSocket from "@/hooks/useSocket";
import InviteUserSocket from "@/pages/Room/InviteUserList/InviteUserSocket";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Card, List } from "antd";
import React from "react";
// others
import { useSelector } from "react-redux";
import InviteUserListItem from "./InviteUserListItem";
import "./style.scss";

const InviteUserList = ({
	withInvite = false,
	title = "Đang Online",
	filter,
}) => {
	const { list } = useSelector((state) => state.onlineUsers);
	const socket = useSocket();

	const displayList = filter ? list.filter(filter) : list;

	return (
		<Card
			className="online-user-list-wrapper"
			title={
				<h3 style={{ margin: 0, textAlign: "center" }}>
					{title} ({displayList.length})
				</h3>
			}
			size="small"
		>
			<List
				dataSource={displayList}
				size="small"
				renderItem={(user) => (
					<InviteUserListItem
						user={user}
						key={user.sub}
						withInvite={withInvite}
					/>
				)}
				rowKey={(user) => user.sub}
			/>
			{socket && <InviteUserSocket />}
		</Card>
	);
};
export default withAuthenticationRequired(InviteUserList);
