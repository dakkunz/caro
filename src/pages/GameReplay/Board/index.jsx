import Square from "@/pages/GameReplay/Square";
import { message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Board = () => {
	const {
		data: { history = [], winCells },
		step = 0,
	} = useSelector((state) => state.gameReplay);

	const currentBoard = history.length && history[step];

	if (!currentBoard) {
		message.error("Error");
		return null;
	}

	const { squares, x, y } = currentBoard;

	return (
		<div className="board-wrapper">
			{squares.map((row, rowIndex) => (
				<div key={rowIndex}>
					{row.map((square, colIndex) => (
						<Square
							value={square}
							key={rowIndex + "-" + colIndex}
							isWinCell={
								Array.isArray(winCells) &&
								step === history.length - 1 &&
								!!winCells.find(
									({ coorX, coorY }) => coorX === rowIndex && coorY === colIndex
								)
							}
							isCurrent={x === rowIndex && y === colIndex}
						/>
					))}
				</div>
			))}
		</div>
	);
};
export default Board;
