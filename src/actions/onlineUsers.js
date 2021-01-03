import { ONLINE_USERS_ACTIONS } from "@/constants/actionTypes";

export const updateOnlineUser = (list) => ({
	type: ONLINE_USERS_ACTIONS.UPDATE_ONLINE,
	payload: { list },
});
