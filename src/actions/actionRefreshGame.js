import { GAME_ACTIONS } from "@/constants/actionTypes";

export default function actionRefreshGame(nextMove) {
	return {
		type: GAME_ACTIONS.REFRESH_GAME,
		nextMove
	};
}