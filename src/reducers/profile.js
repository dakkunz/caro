import { PROFILE_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	trophy: {
		win: 0,
		lost: 0,
		draw: 0,
		total: 0,
		point: 0,
	},
	info: {
		displayName: "",
		joinDate: "",
	},
	shouldRefresh: 0,
	gameHistory: [],
	shouldRefreshGameHistory: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case PROFILE_ACTIONS.GET_USER_INFO:
			return {
				...state,
				...payload,
			};
		case PROFILE_ACTIONS.REFRESH_PROFILE:
			return {
				...state,
				shouldRefresh: new Date().getTime(),
			};
		case PROFILE_ACTIONS.GET_GAME_HISTORY:
			return {
				...state,
				gameHistory: payload.data,
			};
		case PROFILE_ACTIONS.REFRESH_GAME_HISTORY:
			return {
				...state,
				shouldRefreshGameHistory: new Date().getTime(),
			};
		default:
			return state;
	}
};
