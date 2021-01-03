import { ROOM_ACTIONS } from "@/constants/actionTypes";

export default function actionChat(message) {
	return {
		type: ROOM_ACTIONS.CHAT,
		message,
	};
}
