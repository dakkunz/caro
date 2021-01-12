import { GAME_ACTIONS } from "@/constants/actionTypes";

export const actionClick = (history, nextMove, winCells) => {
	return {
		type: GAME_ACTIONS.CLICK,
		history,
		nextMove,
		winCells,
	};
}

export const actionChat = (message) => {
	return {
		type: GAME_ACTIONS.CHAT,
		message,
	};
}

export const actionRefreshGame = (nextMove) => {
	return {
		type: GAME_ACTIONS.REFRESH_GAME,
		nextMove
	};
}

export const actionRequest = (isRequesting, message) => {
    return {
        type: GAME_ACTIONS.REQUEST,
        isRequesting,
        message
    };
}

export const actionSaveGame = () => {
	return {
		type: GAME_ACTIONS.SAVE_GAME,
	};
}

export const actionSetSurrender = (isSurrender) => {
	return {
        type: GAME_ACTIONS.SET_SURRENDER,
        isSurrender
	};
}

export const actionSetDraw= (isDraw) => {
	return {
        type: GAME_ACTIONS.SET_DRAW,
        isDraw
	};
}

export const actionSetWinner = (winner) => {
	return {
        type: GAME_ACTIONS.SET_WINNER,
        winner
	};
}