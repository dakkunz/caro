import { playerColorMapping } from "@/pages/GameReplay/mapping";
import { Card, Input, Tag } from "antd";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import "./style.scss";

const Chat = (props) => {
	const { chatHistoryAll } = props;
	const { socket } = props;

	const [chatMessage, setChatMessage] = useState("");

	const {
		roomInfo: { players },
	} = useSelector((state) => state.room);

	// const [listChat, setListChat] = useState([]);

	// useEffect(() => {
	//   const listChatTemp = [];
	//   for (let i = 0; i < chatHistoryAll.length; i++) {
	//     const color = chatHistoryAll[i].sender === user.sub ? "blue" : "red";
	//     const style = { color: color };
	//     listChatTemp.push(
	//       <b style={style} key={i}>
	//         {chatHistoryAll[i].sender === user.sub ? user.name : rivalName}
	//       </b>
	//     );
	//     listChatTemp.push(": " + chatHistoryAll[i].message);
	//     listChatTemp.push(<br key={i + chatHistoryAll.length}></br>);
	//   }
	//   setListChat(listChatTemp);
	// }, [chatHistoryAll, user, rivalName]);

	const handleChat = () => {
		if (chatMessage.length) {
			socket.emit("chat", chatMessage);
			setChatMessage("");
		}
	};

	return (
		<div className="chat-area-wrapper">
			<Card type="inner" title="Chat">
				<div className="chat-container">
					{chatHistoryAll.map((chat) => {
						const isPlayerX = chat.sender === players.X.sub;
						const senderName = isPlayerX
							? players.X.displayName
							: players.O.displayName;
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
				</div>
				<Input.Search
					value={chatMessage}
					onChange={(e) => setChatMessage(e.target.value)}
					onSearch={() => handleChat()}
					enterButton="Gửi"
				/>
			</Card>
		</div>
		// <form onSubmit={(e) => handleChat(e)}>
		// 	<FormControl
		// 		type="chatMessage"
		// 		className="input-message"
		// 		placeholder="Nội dung"
		// 		value={chatMessage}
		// 		onChange={(e) => setChatMessage(e.target.value)}
		// 	></FormControl>
		// </form>

		// <Card className="card-chat">
		//   <Card.Body className="card-body">
		//     <Card.Title className="card-title">Chat</Card.Title>
		//     <div className="scroll-view-chat">{listChat}</div>
		//     <form onSubmit={(e) => handleChat(e)}>
		//       <FormControl
		//         type="chatMessage"
		//         className="input-message"
		//         placeholder="Nội dung"
		//         value={chatMessage}
		//         onChange={(e) => setChatMessage(e.target.value)}
		//       ></FormControl>
		//     </form>
		//   </Card.Body>
		// </Card>
	);
};

const mapStateToProps = (state) => {
	return {
		chatHistoryAll: state.roomReducers.chatHistoryAll,
	};
};

export default connect(mapStateToProps)(Chat);
