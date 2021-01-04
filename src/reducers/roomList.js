import { ROOM_LIST_ACTION } from "@/constants/actionTypes";

const mockList = new Array(10).fill(0).map((item, id) => ({
	id: id,
	roomName: "Room name" + id,
	host: "Host" + id,
	status: id % 3,
	players: ["Player1"],
	viewers: ["View1", "Viewer2"],
	hasPassword: !!(id % 2),
}));

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	list: mockList,
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
