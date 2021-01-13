import { RANKING_ACTIONS } from "@/constants/actionTypes";

export const getRankingSuccess = (data) => ({
	type: RANKING_ACTIONS.GET_RANKING_SUCCESS,
	payload: { data },
});

export const refreshRanking = () => ({
	type: RANKING_ACTIONS.REFRESH_RANKING,
});

export const selectUserRanking = (user) => ({
	type: RANKING_ACTIONS.SELECT_USER_RANKING,
	payload: user,
});
