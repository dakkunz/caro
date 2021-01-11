import { getUserInfo } from "@/actions/profile";
import useAxios from "@/hooks/useAxios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const FetchUserInfo = () => {
	const axios = useAxios();
	const dispatch = useDispatch();

	useEffect(() => {
		axios.post("/users/info/get").then((res) => {
			dispatch(getUserInfo(res.data));
		});
	}, [axios, dispatch]);

	return <></>;
};
export default FetchUserInfo;
