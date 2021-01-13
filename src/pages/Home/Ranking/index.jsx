// libs
import { getRankingSuccess } from "@/actions/ranking";
import useAxios from "@/hooks/useAxios";
import { Card, List } from "antd";
import React, { useEffect } from "react";
// others
import { useDispatch, useSelector } from "react-redux";
import RankingItem from "./RankingItem";
import "./style.scss";

const Ranking = () => {
	const { list, shouldRefresh } = useSelector((state) => state.ranking);
	const dispatch = useDispatch();
	const axios = useAxios();

	useEffect(() => {
		axios.post("/users/rank").then((res) => {
			dispatch(getRankingSuccess(res.data));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldRefresh]);

	return (
		<Card
			className="ranking-wrapper"
			title={<h3 style={{ margin: 0, textAlign: "center" }}>Bảng xếp hạng</h3>}
			size="small"
		>
			<List
				dataSource={list}
				size="small"
				renderItem={(user, index) => (
					<RankingItem user={user} key={user.sub} rank={index + 1} />
				)}
				rowKey={(user) => user.sub}
			/>
		</Card>
	);
};
export default Ranking;
