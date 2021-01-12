import { getUserInfo } from "@/actions/profile";
import { SOCKET_TYPES } from "@/constants/socketTypes";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import useSocket from "@/hooks/useSocket";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const FetchUserInfo = () => {
	const axios = useAxios();
	const dispatch = useDispatch();
	const { isAuthenticated } = useAuth0();
	const socket = useSocket();

	const { user } = useAuth();
	useEffect(() => {
		if (isAuthenticated) {
			axios.post("/users/info/get").then((res) => {
				dispatch(getUserInfo(res.data));
			});
		}
	}, [axios, dispatch, isAuthenticated]);

	useEffect(() => {
		if (user && user.displayName && socket)
			socket.emit(SOCKET_TYPES.USER_ONLINE, user);
	}, [socket, user]);

	return <></>;
};
export default FetchUserInfo;
