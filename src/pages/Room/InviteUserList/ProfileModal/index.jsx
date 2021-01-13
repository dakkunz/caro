import { LoadingOutlined, TrophyOutlined } from "@ant-design/icons";
import { Modal, Progress, Spin, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const ProfileModal = ({ show, hide }) => {
	const {
		selectedUser: {
			isLoading,
			data: {
				info: { displayName, picture },
				trophy: { point, win, lost, draw, total },
			},
		},
	} = useSelector((state) => state.onlineUsers);

	return (
		<Modal
			title="Thông tin người chơi"
			centered
			width={400}
			closable
			footer={null}
			onCancel={hide}
			visible={show}
		>
			<Spin indicator={<LoadingOutlined />} spinning={isLoading} delay={1000}>
				<div className="profile-modal-wrapper">
					<Avatar shape="circle" src={picture} size={100} />
					<div className="name">{displayName}</div>
					<div className="trophy">
						<TrophyOutlined /> <span>{point}</span>
					</div>
					<div className="rate">
						<Progress
							type="circle"
							status="active"
							percent={(win / total) * 100}
							// success={{ percent: (win / total) * 100 }}
							format={(percent) => (
								<span style={{ fontSize: 16 }}>
									{Math.round(percent)}%<br />
									Tỉ lệ thắng
								</span>
							)}
							trailColor="#ff4d4f"
							width={100}
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
			</Spin>
		</Modal>
	);
};

export default ProfileModal;
