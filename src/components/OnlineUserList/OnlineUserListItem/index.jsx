// libs
import ProfileModal from "@/components/OnlineUserList/ProfileModal";
import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, List } from "antd";
import React, { useState } from "react";
// components
// others
import "./styles.scss";

const OnlineUserListItem = ({ user }) => {
	const [show, setShow] = useState(false);
	const [userSub, setUserSub] = useState(null);

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
						<Button
							type="link"
							icon={<UserOutlined />}
							onClick={() => {
								setUserSub(user.sub);
								setShow(true);
							}}
						>
							Thông tin
						</Button>
					</div>
				}
			/>
			<ProfileModal show={show} hide={() => setShow(false)} userSub={userSub} />
		</List.Item>
	);
};
export default OnlineUserListItem;
