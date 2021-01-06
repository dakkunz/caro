import { GAME_ACTIONS } from "@/constants/actionTypes";

export default function actionRequest(isRequesting, message) {
    return {
        type: GAME_ACTIONS.REQUEST,
        isRequesting,
        message
    };
}