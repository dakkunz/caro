import { PROFILE_ACTIONS } from "@/constants/actionTypes";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
	trophy: {
		win: 0,
		lost: 0,
		draw: 0,
		total: 0,
		point: 0,
	},
	info: {
		displayName: "",
		joinDate: "",
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case PROFILE_ACTIONS.GET_USER_INFO:
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};
