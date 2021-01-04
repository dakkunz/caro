import ViewerListItem from "@/pages/Room/ViewerListItem";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const ViewersArea = () => {
	const { roomInfo } = useSelector((state) => state.room);
	const { user } = useAuth0();
	const { viewers = new Array(10).fill(user) } = roomInfo || {};
	return (
		<Card
			className="viewers-area-wrapper"
			title={
				<h3 style={{ margin: 0, textAlign: "center" }}>
					Viewers ({viewers.length})
				</h3>
			}
			size="small"
		>
			<List
				className="body"
				dataSource={viewers}
				size="small"
				renderItem={(viewer) => <ViewerListItem viewer={viewer} />}
				rowKey={(user) => user.sub}
			/>
		</Card>
	);
};

export default ViewersArea;
