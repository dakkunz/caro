import { ROOM_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	roomInfo: null,
	chat: [],
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ROOM_ACTIONS.JOIN_ROOM_SUCCESS:
			return {
				...state,
				roomInfo: payload.roomInfo,
			};
		case ROOM_ACTIONS.LEAVE_ROOM:
			return {
				chat: [],
				roomInfo: null,
			};
		default:
			return state;
	}
};
