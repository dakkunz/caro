// libs
import OnlineUserListItem from "../../components/OnlineUserListItem";
import { List, message } from "antd";
import React, { useEffect } from "react";
// hooks
import useOnlineListener from "@/hooks/useOnlineListener";
// others
import "./styles.scss";
import Axios from "axios";
import { API_URL } from "@/config/URL";

const OnlineUserList = () => {
	const { list, setList } = useOnlineListener();
	const getOnline = () =>
		Axios.post(API_URL + "/users/online")
			.then(({ data }) => {
				setList(data.users);
			})
			.catch(({ response }) => {
				response && response.data.message
					? message.error(response.data.message)
					: message.error("Register Fail");
			});
	useEffect(() => {
		getOnline();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<List
			className="online-user-list-wrapper"
			loading={false}
			itemLayout="horizontal"
			dataSource={list}
			size="small"
			renderItem={(item) => (
				<OnlineUserListItem item={item} key={item.userId} />
			)}
		/>
	);
};
export default OnlineUserList;
