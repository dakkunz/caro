import { useAuth0 } from "@auth0/auth0-react";
import { Tag } from "antd";
import React from "react";
import "./style.scss";

const ChatHistorySingle = ({ fromUser, message, time }) => {
	const { user } = useAuth0();
	const isYou = fromUser.sub === user.sub;

	return (
		<div className="chat-history-single-wrapper">
			<span>[{time}]</span>
			<Tag color={isYou ? "green" : "blue"}>
				{isYou ? "You" : fromUser.nickname}
			</Tag>
			<span>{message}</span>
		</div>
	);
};

export default ChatHistorySingle;
