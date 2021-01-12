import useAuth from "@/hooks/useAuth";
import { TrophyOutlined } from "@ant-design/icons";
import { Avatar, Progress, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const UserTrophy = () => {
	const {
		user: { picture, displayName },
	} = useAuth();

	const {
		trophy: { win, lost, point, total, draw },
	} = useSelector((state) => state.profile);

	return (
		<div className="user-trophy-wrapper">
			<Avatar shape="circle" src={picture} size={150} />
			<div className="name">{displayName}</div>
			<div className="trophy">
				<TrophyOutlined /> <span>{point}</span>
			</div>
			<div className="rate">
				<Progress
					type="circle"
					status="active"
					percent={((win + draw) / total) * 100}
					success={{ percent: (win / total) * 100 }}
					format={(percent, successPercent) => (
						<span style={{ fontSize: 24 }}>
							{Math.round(successPercent)}%<br />
							Tỉ lệ thắng
						</span>
					)}
					trailColor="#ff4d4f"
					width={150}
				/>
			</div>
			<div className="count">
				<Tag color="cyan">{total} trận</Tag>
			</div>
			<div className="count">
				<Tag color="#87d068">{win} Thắng</Tag>
				<Tag color="#108ee9">{draw} Hòa</Tag>
				<Tag color="#ff4d4f">{lost} Thua</Tag>
			</div>
		</div>
	);
};
export default UserTrophy;
