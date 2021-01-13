import useRouter from "@/hooks/useRouter";
import { playerColorMapping } from "@/pages/GameReplay/mapping";
import { Tag } from "antd";
import React from "react";
import { Card } from "react-bootstrap";

const Chat = () => {
	const { location } = useRouter();
	const { chatHistory = [], xPlayer, oPlayer } = location.state || {};

	return (
		<Card type="inner" title="Chat">
			{chatHistory.map(({ sender, message, id }) => {
				const isPlayerX = sender === xPlayer.sub;
				const senderName = isPlayerX
					? xPlayer.displayName
					: oPlayer.displayName;

				return (
					<div key={id}>
						<Tag color={playerColorMapping[isPlayerX ? "X" : "O"]}>
							{senderName}
						</Tag>
						{message}
					</div>
				);
			})}
		</Card>
	);
};

export default Chat;
