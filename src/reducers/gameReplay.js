import { GAME_REPLAY_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	game: null,
	step: 0,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GAME_REPLAY_ACTIONS.GET_GAME_REPLAY:
			return {
				game: payload,
				step: 0,
			};
		case GAME_REPLAY_ACTIONS.SET_STEP:
			return {
				...state,
				step: payload,
			};
		case GAME_REPLAY_ACTIONS.RESET_REDUCER:
			return initialState;
		default:
			return state;
	}
};
