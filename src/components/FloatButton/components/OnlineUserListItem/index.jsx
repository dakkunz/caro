// libs
import { Avatar, Badge, List, Skeleton } from "antd";
import React from "react";
// components
// others
import "./styles.scss";

const OnlineUserListItem = ({ item }) => (
	<List.Item className="online-user-list-item-wrapper">
		<Skeleton avatar title={false} loading={item.loading} active>
			<List.Item.Meta
				avatar={
					<Badge status="success" offset={[0, 35]}>
						<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					</Badge>
				}
				title={item.name}
				description={item.email}
			/>
		</Skeleton>
	</List.Item>
);
export default OnlineUserListItem;
