// libs
import useSocket from "@/hooks/useSocket";
import { SmileOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, List } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const OnlineUserListItem = ({ user }) => {
	const socket = useSocket();
	return (
		<List.Item className="online-user-list-item-wrapper">
			<List.Item.Meta
				avatar={
					<Badge status="success" offset={[0, 35]}>
						<Avatar src={user.picture} />
					</Badge>
				}
				title={user.displayName || user.name}
				description={
					<div className="user-desc">
						<div className="user-trophy">
							<TrophyOutlined /> <span>{(user.trophy || {}).point}</span>
						</div>
						<Button type="link" icon={<UserOutlined />}>
							Profile
						</Button>
						<Button
							type="link"
							icon={<SmileOutlined />}
							onClick={() => socket.emit("invite-room", user.socketId)}
						>
							Invite
						</Button>
					</div>
				}
			/>
		</List.Item>
	);
};
export default OnlineUserListItem;
