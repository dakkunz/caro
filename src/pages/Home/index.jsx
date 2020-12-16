// libs
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OnlineUserList from "@/components/FloatButton/mains/OnlineUserList";
import useAuth from "@/hooks/useAuth";
import useOnlineListener from "@/hooks/useOnlineListener";
import { Avatar, Button } from "antd";
import { Button as Button2}  from 'react-bootstrap';
import useSocket from "@/hooks/useSocket";
import React from "react";
import { useEffect } from "react";
// components
//actions
import actionJoinRoom from "@/actions/actionJoinRoom";
// others
import "./styles.scss";
import Game from "@/components/Game";

const Home = (props) => {
  const {
    logout,
    user,
  } = useAuth();

  const { actions } = props;
  const { roomInfo } = props;

  const socketUserOnline = useOnlineListener().socket;
  const submitLogout = () => {
    logout();
    socketUserOnline.disconnect();
  };
  
  const socket = useSocket();

  useEffect(() => {
    socket.removeAllListeners();
    socket.on("joinroom-success", function (roomInfo) {
	  socket.joinroom = true;
	  console.log(roomInfo);
      actions.actionJoinRoom(roomInfo);
    });
  });

  if (roomInfo) {
    return <Game />
  }

  return (
    <div className="home-wrapper">
      <div>
        Welcome, {user.name} - {user.email}
      </div>
      <Avatar src={user.image} shape="circle" />
      <div>
        <Button onClick={submitLogout}>Logout</Button>
      </div>
      <div>
        <OnlineUserList />
      </div>
      <center>
        <div>
          <Button2
            variant="danger"
            onClick={(e) => findRival(e, user)}
            as="input"
            type="button"
            value="Chơi nhanh"
            onChange={() => {}}
          ></Button2>
        </div>
      </center>
    </div>
  );

  function findRival(e, user) {
    e.target.value = "Đang tìm trận...";
    e.target.disabled = true;
    socket.emit("joinroom", user);
  }
};

// Connect variables
function mapStateToProps(state) {
  return {
    roomInfo: state.roomReducers.roomInfo,
  };
}

// Connect functions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        actionJoinRoom,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
