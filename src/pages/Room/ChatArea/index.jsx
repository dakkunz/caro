import ChatHistory from "@/pages/Room/ChatHistory";
import ChatInput from "@/pages/Room/ChatInput";
import React from "react";
import "./style.scss";

const ChatArea = () => {
	return (
		<div className="chat-area-wrapper">
			<ChatHistory />
			<ChatInput />
		</div>
	);
};
export default ChatArea;
