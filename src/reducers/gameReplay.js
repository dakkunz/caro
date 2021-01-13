import { GAME_REPLAY_ACTION_TYPES } from "@/constants/actionTypes";

const initialState = {
	data: null,
	step: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
	switch (type) {
		case GAME_REPLAY_ACTION_TYPES.FETCH_GAME_REPLAY:
			return {
				...state,
				data: payload,
			};
		case GAME_REPLAY_ACTION_TYPES.SET_STEP:
			return {
				...state,
				step: payload,
			};
		default:
			return state;
	}
};
