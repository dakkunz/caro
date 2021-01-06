import { ROOM_LIST_ACTION } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	list: [],
	isLoading: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ROOM_LIST_ACTION.GET_ROOMS_LOADING:
			return {
				...state,
				isLoading: payload.isLoading,
			};
		case ROOM_LIST_ACTION.GET_ROOMS_SUCCESS:
			return {
				...state,
				list: payload.list,
			};
		case ROOM_LIST_ACTION.SELECT_ROOM:
			return {
				...state,
				selectedRoom: payload.room,
			};
		case ROOM_LIST_ACTION.UPDATE_ROOM_LIST:
			return {
				...state,
				list: payload.list,
			};
		default:
			return state;
	}
};
