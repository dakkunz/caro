import { ROOM_ACTIONS } from "@/constants/actionTypes";

export default function actionJoinRoom(roomInfo) {
	return {
		type: ROOM_ACTIONS.JOIN_ROOM,
		roomInfo,
	};
}
