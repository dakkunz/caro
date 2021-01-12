import { ONLINE_USERS_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	list: [],
	selectedUser: {
		data: {
			info: {},
			trophy: {},
		},
		isLoading: false,
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ONLINE_USERS_ACTIONS.UPDATE_ONLINE:
			return {
				...state,
				list: payload.list,
			};
		case ONLINE_USERS_ACTIONS.FETCH_SELECTED_USER_LOADING:
			return {
				...state,
				selectedUser: {
					...state.selectedUser,
					isLoading: payload,
				},
			};
		case ONLINE_USERS_ACTIONS.FETCH_SELECTED_USER_SUCCESS:
			return {
				...state,
				selectedUser: {
					...state.selectedUser,
					data: payload.data,
				},
			};
		default:
			return state;
	}
};
