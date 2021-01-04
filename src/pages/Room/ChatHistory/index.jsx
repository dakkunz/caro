import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import moment from "moment";
import ChatHistorySingle from "@/pages/Room/ChatHistorySingle";

const fakeChat = (user) =>
	new Array(20).fill(0).map((item, id) => ({
		fromUser: id % 3 === 0 ? user : { nickname: "Nickname " + id, sub: id },
		message: "Test message " + Math.random() * 1000,
		time: moment().format("HH:mm"),
	}));

const ChatHistory = () => {
	const { user } = useAuth0();

	// Lấy chat từ redux lên, bỏ fakechat đi, có dạng
	// {
	//     formUser,
	//     message,
	//     time
	// }
	// Không cần quan tâm tới socket, socket nhận được => lưu vào redux => redux tự xử lí phần còn lại
	// miễn sao socket gửi lên đúng cái object có dạng kia là được

	// Tất cả các kiểu socket.on("join-room") hay gì gì đó đều làm trong useProvideSocket
	// Nếu ko thể xử lí trực tiếp tại đó, thì viết action lưu xuống redux, rồi lên component lấy mà xài
	// Socket nhận được => lưu xuống redux => lúc này redux thay đổi => react sẽ biết được nó thay đổi => nó tự chạy
	// Trong component chỉ có socket.emit("gì gì đó") thôi

	const { chat } = useSelector((state) => state.room);

	return (
		<div className="chat-history-wrapper">
			{(chat.length ? chat : fakeChat(user)).map(
				({ fromUser, time, message }, id) => (
					<ChatHistorySingle {...{ fromUser, time, message }} key={id} />
				)
			)}
		</div>
	);
};

export default ChatHistory;
