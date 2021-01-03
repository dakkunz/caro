import { GAME_ACTIONS } from "@/constants/actionTypes";

export default function actionClick(history, nextMove, winCells) {
	return {
		type: GAME_ACTIONS.CLICK,
		history,
		nextMove,
		winCells,
	};
}
