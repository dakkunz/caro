import { PROFILE_ACTIONS } from "@/constants/actionTypes";

export const getUserInfo = ({ info, trophy }) => ({
	type: PROFILE_ACTIONS.GET_USER_INFO,
	payload: { info, trophy },
});
