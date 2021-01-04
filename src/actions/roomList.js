import { ROOM_LIST_ACTION } from "@/constants/actionTypes";

export const selectRoom = (room) => ({
	type: ROOM_LIST_ACTION.SELECT_ROOM,
	payload: { room },
});

export const updateRoomList = (list) => ({
	type: ROOM_LIST_ACTION.UPDATE_ROOM_LIST,
	payload: { list },
});
