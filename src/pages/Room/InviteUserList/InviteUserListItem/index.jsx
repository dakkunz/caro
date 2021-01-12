// libs
import {
	fetchSelectedUserLoading,
	fetchSelectedUserSuccess,
} from "@/actions/onlineUsers";
import useAxios from "@/hooks/useAxios";
import useSocket from "@/hooks/useSocket";
import ProfileModal from "@/pages/Room/InviteUserList/ProfileModal";
import { SmileOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, List, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
// others
import "./styles.scss";

const InviteUserListItem = ({ user, withInvite }) => {
	const socket = useSocket();
	const dispatch = useDispatch();
	const axios = useAxios();
	const [show, setShow] = useState(false);
	const [inviting, setInviting] = useState(false);
	const { roomInfo } = useSelector((state) => state.room);

	useEffect(() => {
		const handleAcceptInvite = (invitedUser) => {
			if (invitedUser.sub === user.sub) {
				notification.success({
					message: `${user.displayName} đã vào phòng`,
				});
				setInviting(false);
			}
		};

		const handleDeclineInvite = (invitedUser) => {
			if (invitedUser.sub === user.sub) {
				notification.error({
					message: `${user.displayName} đã từ chối lời mời`,
				});
				setInviting(false);
			}
		};
		if (socket) {
			socket
				.on("accept-invite-request", handleAcceptInvite)
				.on("decline-invite-request", handleDeclineInvite);
		}
		return () => {
			socket
				.off("accept-invite-request", handleAcceptInvite)
				.off("decline-invite-request", handleDeclineInvite);
		};
	}, [socket, user.displayName, user.sub]);

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
							Thông tin
						</Button>
						{withInvite && (
							<Button
								type="link"
								loading={inviting}
								icon={<SmileOutlined />}
								onClick={() => {
									if (roomInfo.players.X && roomInfo.players.O) {
										message.error("Phòng đã đủ người");
									} else {
										setInviting(true);
										socket.emit("invite-room", user.socketId);
									}
								}}
							>
								{inviting ? "Đang chờ" : "Mời"}
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
