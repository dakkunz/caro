import React from "react";
import RoomList from "@/pages/Home/RoomList";
import RoomActions from "@/pages/Home/RoomActions";
import OnlineUserList from "@/pages/Home/OnlineUserList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useAuth0 } from "@auth0/auth0-react";
//components
import Game from "@/components/Game";
//actions
import actionJoinRoom from "@/actions/actionJoinRoom";
// others
import "./style.scss";

const Home = (props) => {
  const { user } = useAuth0();

  const { roomInfo } = props;

  if (roomInfo) {
    return <Game />;
  }

  return (
    <div className="home-wrapper">
      <RoomList />
      <OnlineUserList />
      <RoomActions user={user} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    roomInfo: state.roomReducers.roomInfo,
  };
}

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
