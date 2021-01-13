import { replayResetReducer } from "@/actions/gameReplay";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Prompt, Redirect } from "react-router-dom";
import Chat from "./Chat";

const GameReplay = () => {
	const { game } = useSelector((state) => state.gameReplay);
	const dispatch = useDispatch();

	return game ? (
		<div className="game-replay-wrapper">
			<Chat />

			<Prompt
				message={() => {
					dispatch(replayResetReducer());
				}}
			/>
		</div>
	) : (
		<Redirect to="/profile" />
	);
};

export default GameReplay;
