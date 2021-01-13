const { GAME_REPLAY_ACTIONS } = require("@/constants/actionTypes");

export const getGameReplay = (game) => ({
	type: GAME_REPLAY_ACTIONS.GET_GAME_REPLAY,
	payload: game,
});

export const setStep = (step) => ({
	type: GAME_REPLAY_ACTIONS.SET_STEP,
	payload: step,
});

export const replayResetReducer = () => ({
	type: GAME_REPLAY_ACTIONS.RESET_REDUCER,
});
