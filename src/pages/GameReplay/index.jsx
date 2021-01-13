import { fetchGameReplaySuccess } from "@/actions/GameReplay";
import LoadingIndicator from "@/components/LoadingIndicator";
import useAxios from "@/hooks/useAxios";
import useRouter from "@/hooks/useRouter";
import Board from "@/pages/GameReplay/Board";
import ChatArea from "@/pages/GameReplay/ChatArea";
import ControlStep from "@/pages/GameReplay/ControlStep";
import PlayerArea from "@/pages/GameReplay/PlayerArea";
import Status from "@/pages/GameReplay/Status";
import { Result } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const GameReplay = () => {
	const dispatch = useDispatch();
	const { params } = useRouter();
	const [loading, setLoading] = useState(false);
	const { data } = useSelector((state) => state.gameReplay);
	const Axios = useAxios();

	useEffect(() => {
		setLoading(true);
		Axios.get("/games/by-id/" + (params || {}).id)
			.then((res) => dispatch(fetchGameReplaySuccess(res.data)))
			.finally(() =>
				setTimeout(() => {
					setLoading(false);
				}, 1000)
			);
	}, [Axios, dispatch, params]);

	return loading ? (
		<LoadingIndicator />
	) : data ? (
		<div className="game-replay-wrapper">
			<div className="left">
				<Status />
				<PlayerArea />
			</div>
			<div className="center">
				<Board />
				<ControlStep />
			</div>
			<div className="right">
				<ChatArea />
			</div>
		</div>
	) : (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
		/>
	);
};
export default GameReplay;
