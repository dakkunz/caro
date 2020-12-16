// libs
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import React, { useState } from "react";
import { useEffect } from "react";
// components
//actions
import actionJoinRoom from "@/actions/actionJoinRoom";
// others
import "./styles.scss";
import Game from "@/components/Game";
import { Button } from "antd";

const Home = (props) => {
	const { user } = useAuth();

	const { actions } = props;
	const { roomInfo } = props;

	const [loading, setLoading] = useState(false);

	const socket = useSocket();

	useEffect(() => {
		socket.removeAllListeners();
		socket.on("joinroom-success", function (roomInfo) {
			socket.joinroom = true;
			console.log(roomInfo);
			actions.actionJoinRoom(roomInfo);
			setLoading(false);
		});
	}, [socket, actions]);

	if (roomInfo) {
		return <Game />;
	}

	return (
		<div className="home-wrapper">
			<center>
				<Button
					onClick={(e) => findRival(e, user)}
					type="primary"
					value="Chơi nhanh"
					loading={loading}
				>
					Play
				</Button>
			</center>
		</div>
	);

	function findRival(e, user) {
		setLoading(true);
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
