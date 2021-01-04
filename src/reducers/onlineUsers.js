import { ONLINE_USERS_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	list: [],
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ONLINE_USERS_ACTIONS.UPDATE_ONLINE:
			return {
				...state,
				list: payload.list,
			};
		default:
			return state;
	}
};
