import actionChatRoom from "@/actions/actionChatRoom";
import actionJoinRoom from "@/actions/actionJoinRoom";
import { actionChat } from "@/actions/gameActions";
import { receiveChat, setIsJoinGame } from "@/actions/room";
import { SOCKET_URL } from "@/config/URL";
import { SOCKET_TYPES } from "@/constants/socketTypes";
// game actions
import { useEventClick, useEventTime } from "@/hooks/useEvent";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

const useProvideSocket = () => {
	const [socketInstance, setSocket] = useState();
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const dispatch = useDispatch();
	const { push } = useHistory();

	useEffect(() => {
		if (isAuthenticated) {
			getAccessTokenSilently().then((token) => {
				setSocket(
					io(SOCKET_URL, {
						query: { token },
					})
				);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	useEffect(() => {
		if (socketInstance) {
			socketInstance
				.on(SOCKET_TYPES.CONNECT, () => {
					console.log("socket connect success");
				})
				// invite

				// room

				.on(SOCKET_TYPES.ROOM__RECEIVE_CHAT, ({ fromUser, message, time }) => {
					dispatch(receiveChat({ fromUser, message, time }));
				})
				.on(SOCKET_TYPES.ROOM__JOIN_GAME_SUCCESS, (gameInfo) => {
					push("/room", { gameInfo });
				})
				// game
				.on("start-game", () => {
					console.log("start-game");
					dispatch(setIsJoinGame(true));
					useEventTime.emit("set-time");
				})
				.on(SOCKET_TYPES.JOIN_ROOM_QUICK_SUCCESS, (roomInfo) => {
					console.log(roomInfo);
					dispatch(actionJoinRoom(roomInfo));
				})
				.on(SOCKET_TYPES.CHAT, (data) => {
					dispatch(actionChat(data));
					dispatch(actionChatRoom(data));
				})
				.on(SOCKET_TYPES.MOVE, (data) => {
					useEventClick.emit("add-new-move", data);
				})
				.on(SOCKET_TYPES.DISCONNECT_ROOM, (data) => {
					if (data.id) dispatch(actionJoinRoom(data));
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, push, socketInstance]);

	return socketInstance;
};

export default useProvideSocket;
