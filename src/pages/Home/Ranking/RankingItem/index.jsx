import { selectUserRanking } from "@/actions/ranking";
import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ProfileModal from "../ProfileModal";
import "./style.scss";

const rankColorMapping = {
	1: "#fee101",
	2: "#a7a7ad",
	3: "#824a02",
};

const RankingItem = ({ user, rank }) => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();

	return (
		<List.Item className="ranking-item-wrapper">
			<List.Item.Meta
				avatar={
					<div style={{ display: "flex", alignItems: "center" }}>
						<span
							style={{
								color: rankColorMapping[rank],
								fontSize: 24,
								fontWeight: "bold",
								marginRight: 5,
							}}
						>
							{rank}
						</span>
						<Avatar src={user.picture} />
					</div>
				}
				title={user.displayName || user.name}
				description={
					<div className="user-desc">
						<div className="user-trophy">
							<TrophyOutlined /> <span>{user.point}</span>
						</div>
						<Button
							type="link"
							icon={<UserOutlined />}
							onClick={() => {
								dispatch(selectUserRanking(user));
								setShow(true);
							}}
						>
							Thông tin
						</Button>
					</div>
				}
				extra={"asdasdasd"}
			/>
			<ProfileModal show={show} hide={() => setShow(false)} />
		</List.Item>
	);
};

export default RankingItem;
