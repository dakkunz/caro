import { PROFILE_ACTIONS } from "@/constants/actionTypes";

export const getUserInfo = (userInfo) => ({
	type: PROFILE_ACTIONS.GET_USER_INFO,
	payload: userInfo,
});
