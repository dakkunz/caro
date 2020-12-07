// libs
import OnlineUserListItem from "../../components/OnlineUserListItem";
import { List } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const OnlineUserList = () => (
	<List
		className="online-user-list-wrapper"
		loading={false}
		itemLayout="horizontal"
		dataSource={[
			{ id: "1", name: "Toan", email: "kurokenshiz@gmail.com" },
			{ id: "2", name: "Toan", email: "kurokenshiz@gmail.com" },
		]}
		renderItem={(item) => <OnlineUserListItem item={item} key={item.id} />}
	/>
);
export default OnlineUserList;
