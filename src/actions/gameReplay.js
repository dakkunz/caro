import { GAME_REPLAY_ACTION_TYPES } from "@/constants/actionTypes";

export const fetchGameReplaySuccess = (data) => ({
	type: GAME_REPLAY_ACTION_TYPES.FETCH_GAME_REPLAY,
	payload: data,
});

export const setReplayStep = (step) => ({
	type: GAME_REPLAY_ACTION_TYPES.SET_STEP,
	payload: step,
});
