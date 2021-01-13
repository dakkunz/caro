import Config from "@/constants/configs";
import React from "react";
import Square from "../../components/Square";

const checkWinCell = (winCells, row, col) => {
	if (winCells == null) {
		return false;
	}

	for (let i = 0; i < winCells.length; i += 1) {
		const curCell = winCells[i];
		if (curCell.coorX === row && curCell.coorY === col) {
			return true;
		}
	}
	return false;
};

const Board = (props) => {
	// const squaresDiv = [];
	const { winCells } = props;
	const { squares } = props;
	const { handleClick } = props;
	const { currentCell } = props;

	// for (let i = 0; i < squares.length; i += 1) {
	//     for (let j = 0; j < squares[i].length; j += 1) {

	//         const squareKey = i * Config.brdSize + j;
	//         const isCurrentCell = currentCell[0] === i && currentCell[1] === j;

	//         squaresDiv.push(<Square winCell={checkWinCell(winCells, i, j)}
	//             value={squares[i][j]}
	//             row={i}
	//             col={j}
	//             isCurrentCell={isCurrentCell}
	//             handleClick={(row, col) => handleClick(row, col)}
	//             key={squareKey}/>);
	//     }
	// }
	return (
		<div className="board-wrapper">
			{squares.map((row, rowIndex) => (
				<div key={rowIndex}>
					{row.map((square, colIndex) => {
						const squareKey = rowIndex * Config.brdSize + colIndex;
						const isCurrentCell =
							currentCell[0] === rowIndex && currentCell[1] === colIndex;
						return (
							<Square
								winCell={checkWinCell(winCells, rowIndex, colIndex)}
								value={squares[rowIndex][colIndex]}
								row={rowIndex}
								col={colIndex}
								isCurrentCell={isCurrentCell}
								handleClick={(row, col) => handleClick(row, col)}
								key={squareKey}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default Board;
