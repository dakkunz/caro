import { GAME_ACTIONS } from "@/constants/actionTypes";

export default function actionChat(message) {
	return {
		type: GAME_ACTIONS.CHAT,
		message,
	};
}
