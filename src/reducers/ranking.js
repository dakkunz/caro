import { RANKING_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	list: [],
	shouldRefresh: 0,
	selectedUser: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case RANKING_ACTIONS.GET_RANKING_SUCCESS:
			return {
				...state,
				list: payload.data,
			};
		case RANKING_ACTIONS.REFRESH_RANKING:
			return {
				...state,
				shouldRefresh: new Date().getTime(),
			};
		case RANKING_ACTIONS.SELECT_USER_RANKING:
			return {
				...state,
				selectedUser: payload,
			};
		default:
			return state;
	}
};
