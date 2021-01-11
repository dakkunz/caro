import { ROOM_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	roomInfo: null,
	chat: [],
	isJoinGame: false,
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
				isJoinGame: false,
			};
		case ROOM_ACTIONS.SET_IS_JOIN_GAME:
			return {
				...state,
				isJoinGame: payload,
			};
		case ROOM_ACTIONS.SET_TIME:
			return {
				...state,
				roomInfo: {
					...state.roomInfo,
					time: payload,
				},
			};
		case ROOM_ACTIONS.REFRESH:
			return {
				...state,
				isJoinGame: false,
				roomInfo: null,
			};
		default:
			return state;
	}
};
