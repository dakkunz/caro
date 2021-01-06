import { GAME_ACTIONS } from "@/constants/actionTypes";

export default function actionSaveGame() {
	return {
		type: GAME_ACTIONS.SAVE_GAME,
	};
}