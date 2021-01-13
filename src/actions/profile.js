import { PROFILE_ACTIONS } from "@/constants/actionTypes";

export const getUserInfo = ({ info, trophy }) => ({
	type: PROFILE_ACTIONS.GET_USER_INFO,
	payload: { info, trophy },
});

export const refreshUserInfo = () => ({
	type: PROFILE_ACTIONS.REFRESH_PROFILE,
});

export const getUserGameHistory = (data) => ({
	type: PROFILE_ACTIONS.GET_GAME_HISTORY,
	payload: { data },
});

export const refreshGameHistory = () => ({
	type: PROFILE_ACTIONS.REFRESH_GAME_HISTORY,
});
