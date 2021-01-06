import { ROOM_ACTIONS } from "@/constants/actionTypes";

export const joinRoomSuccess = (roomInfo) => ({
	type: ROOM_ACTIONS.JOIN_ROOM_SUCCESS,
	payload: { roomInfo },
});

export const leaveRoom = (roomId) => ({
	type: ROOM_ACTIONS.LEAVE_ROOM,
	payload: { roomId },
});

export const receiveChat = ({ fromUser, message, time }) => ({
	type: ROOM_ACTIONS.RECEIVE_CHAT,
	payload: { fromUser, message, time },
});

export const setIsJoinGame = (isJoinGame) => ({
	type: ROOM_ACTIONS.SET_IS_JOIN_GAME,
	payload: isJoinGame,
});
