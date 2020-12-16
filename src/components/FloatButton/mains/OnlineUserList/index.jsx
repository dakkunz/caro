// libs
import OnlineUserListItem from "../../components/OnlineUserListItem";
import { List } from "antd";
import React from "react";
// hooks
import useOnlineListener from "@/hooks/useOnlineListener";
// others
import "./styles.scss";

const OnlineUserList = () => {
	const { list } = useOnlineListener();

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
