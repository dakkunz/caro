import { playerColorMapping } from "@/pages/GameReplay/mapping";
import { Card, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const ChatArea = () => {
	const { chatHistory = [], xPlayer, oPlayer } = useSelector(
		(state) => state.gameReplay.data || {}
	);

	return (
		<div className="chat-area-wrapper">
			<Card type="inner" title="Chat">
				{chatHistory.map((chat) => {
					const isPlayerX = chat.sender === xPlayer.sub;
					const senderName = isPlayerX
						? xPlayer.displayName
						: oPlayer.displayName;
					const color = playerColorMapping[isPlayerX ? "X" : "O"];
					return (
						<div
							key={chat.id}
							style={{ margin: "5px 0", whiteSpace: "pre-wrap" }}
						>
							<Tag color={color}>{senderName}</Tag>
							{chat.message}
						</div>
					);
				})}
			</Card>
		</div>
	);
};

export default ChatArea;
