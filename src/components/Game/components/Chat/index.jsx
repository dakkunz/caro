import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, FormControl } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Chat = (props) => {
  const { user } = useAuth0();

  const { chatHistoryAll } = props;
  const { socket } = props;
  const { rivalName } = props;

  const [chatMessage, setChatMessage] = useState("");
  const [listChat, setListChat] = useState([]);

  useEffect(() => {
    const listChatTemp = [];
    for (let i = 0; i < chatHistoryAll.length; i++) {
      const color = chatHistoryAll[i].sender === user.sub ? "blue" : "red";
      const style = { color: color };
      listChatTemp.push(
        <b style={style} key={i}>
          {chatHistoryAll[i].sender === user.sub ? user.name : rivalName}
        </b>
      );
      listChatTemp.push(": " + chatHistoryAll[i].message);
      listChatTemp.push(<br key={i + chatHistoryAll.length}></br>);
    }
    setListChat(listChatTemp);
  }, [chatHistoryAll, user, rivalName]);

  const handleChat = (e) => {
    e.preventDefault();
    socket.emit("chat", chatMessage);
    setChatMessage("");
  };

  return (
    <Card className="card-chat">
      <Card.Body className="card-body">
        <Card.Title className="card-title">Chat</Card.Title>
        <div className="scroll-view-chat">{listChat}</div>
        <form onSubmit={(e) => handleChat(e)}>
          <FormControl
            type="chatMessage"
            className="input-message"
            placeholder="Nội dung"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          ></FormControl>
        </form>
      </Card.Body>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    chatHistoryAll: state.roomReducers.chatHistoryAll,
  };
};

export default connect(mapStateToProps)(Chat);
