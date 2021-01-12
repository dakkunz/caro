import { ONLINE_USERS_ACTIONS } from "@/constants/actionTypes";

export const updateOnlineUser = (list) => ({
	type: ONLINE_USERS_ACTIONS.UPDATE_ONLINE,
	payload: { list },
});

export const fetchSelectedUserSuccess = (data) => ({
	type: ONLINE_USERS_ACTIONS.FETCH_SELECTED_USER_SUCCESS,
	payload: { data },
});

export const fetchSelectedUserLoading = (isLoading) => ({
	type: ONLINE_USERS_ACTIONS.FETCH_SELECTED_USER_LOADING,
	payload: isLoading,
});
