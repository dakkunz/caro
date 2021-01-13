import { getGameReplay } from "@/actions/gameReplay";
import { getUserGameHistory } from "@/actions/profile";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { columns } from "@/pages/Profile/GameHistory/tableCols";
import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.scss";

const GameHistory = () => {
	const { gameHistory, shouldRefreshGameHistory } = useSelector(
		(state) => state.profile
	);
	const { push } = useHistory();
	const { user } = useAuth();
	const axios = useAxios();
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get("/games/" + user.sub)
			.then((res) => dispatch(getUserGameHistory(res.data.games)))
			.catch(() => dispatch(getUserGameHistory([])));
	}, [axios, user.sub, shouldRefreshGameHistory, dispatch]);

	return (
		<div className="game-history-wrapper">
			<h2>Lịch sử đấu</h2>
			<Table
				size="small"
				bordered
				columns={columns({ user })}
				dataSource={gameHistory}
				pagination={{ pageSize: 5 }}
				rowKey={(game) => game.id}
				onRow={(game) => ({
					onClick: () => {
						dispatch(getGameReplay(game));
						push("/game-replay/" + game.id);
					},
				})}
			/>
		</div>
	);
};
export default GameHistory;
