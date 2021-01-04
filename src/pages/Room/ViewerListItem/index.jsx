import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";
import React from "react";
import "./style.scss";

const ViewerListItem = ({ viewer }) => (
	<List.Item className="viewer-list-item-wrapper">
		<List.Item.Meta
			avatar={<Avatar src={viewer.picture} />}
			title={viewer.name}
			description={
				<div className="viewer-desc">
					<div className="viewer-trophy">
						<TrophyOutlined /> <span>555</span>
					</div>
					<Button type="link" icon={<UserOutlined />}>
						Profile
					</Button>
				</div>
			}
		/>
	</List.Item>
);
export default ViewerListItem;
