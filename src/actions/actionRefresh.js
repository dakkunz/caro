import { ROOM_ACTIONS } from "@/constants/actionTypes";

export default function actionRefresh() {
	return {
		type: ROOM_ACTIONS.REFRESH,
	};
}
