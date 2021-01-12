// libs
import {
	fetchSelectedUserLoading,
	fetchSelectedUserSuccess,
} from "@/actions/onlineUsers";
import useAxios from "@/hooks/useAxios";
import useSocket from "@/hooks/useSocket";
import ProfileModal from "@/pages/Room/InviteUserList/ProfileModal";
import { SmileOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, List } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// components
// others
import "./styles.scss";

const InviteUserListItem = ({ user, withInvite }) => {
	const socket = useSocket();
	const dispatch = useDispatch();
	const axios = useAxios();
	const [show, setShow] = useState(false);

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
								setShow(true);
								dispatch(fetchSelectedUserLoading(true));
								axios
									.post("/users/info/search", { sub: user.sub })
									.then((res) => {
										dispatch(fetchSelectedUserSuccess(res.data));
									})
									.finally(() => dispatch(fetchSelectedUserLoading(false)));
							}}
						>
							Profile
						</Button>
						{withInvite && (
							<Button
								type="link"
								icon={<SmileOutlined />}
								onClick={() => socket.emit("invite-room", user.socketId)}
							>
								Invite
							</Button>
						)}
					</div>
				}
			/>
			<ProfileModal show={show} hide={() => setShow(false)} />
		</List.Item>
	);
};
export default InviteUserListItem;
