import { ROOM_ACTIONS } from "@/constants/actionTypes";

export const joinRoomSuccess = (roomInfo) => ({
	type: ROOM_ACTIONS.JOIN_ROOM_SUCCESS,
	payload: { roomInfo },
});

export const leaveRoom = (roomId) => ({
	type: ROOM_ACTIONS.LEAVE_ROOM,
	payload: { roomId },
});
