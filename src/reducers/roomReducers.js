import { ROOM_ACTIONS } from "@/constants/actionTypes";
import Config from "../constants/configs";

export default function handleRoom(state = Config.initialState, action) {
	switch (action.type) {
		case ROOM_ACTIONS.JOIN_ROOM:
			return {
				...state,
				roomInfo: action.roomInfo,
			};

		case ROOM_ACTIONS.CHAT_ROOM:
			return {
				...state,
				chatHistoryAll: [...state.chatHistoryAll, action.message],
			};

		case ROOM_ACTIONS.REFRESH:
			return Config.initialState;

		default:
			return state;
	}
}
