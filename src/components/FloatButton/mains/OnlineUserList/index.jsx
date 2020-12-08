// libs
import OnlineUserListItem from "../../components/OnlineUserListItem";
import { List } from "antd";
import React, { useEffect } from "react";
// hooks
import useOnlineListener from "@/hooks/useOnlineListener";
// others
import "./styles.scss";
import useAuth from "@/hooks/useAuth";

const OnlineUserList = () => {
	const { list, emitOnline } = useOnlineListener();
	const { user } = useAuth();
	// useEffect(() => {
	// 	console.log(user);
	// 	emitOnline(user);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [user]);
	return (
		<List
			className="online-user-list-wrapper"
			loading={false}
			itemLayout="horizontal"
			dataSource={list}
			renderItem={(item) => (
				<OnlineUserListItem item={item} key={item.userId} />
			)}
		/>
	);
};
export default OnlineUserList;
