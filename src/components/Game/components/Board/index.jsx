import React from 'react';
import Square from '../../components/Square';
import Config from '@/constants/configs';

const checkWinCell = (winCells, row, col) => {
    if (winCells == null) {
        return false;
    }

    for (let i = 0; i < winCells.length; i += 1) {
        const curCell = winCells[i];
        if (curCell[0] === row && curCell[1] === col) {
            return true;
        }
    }
    return false;
}

const Board = (props) => {
    const squaresDiv = [];
    const { winCells } = props;
    const { squares } = props;
    const { handleClick } = props;
    const { currentCell } = props;

    for (let i = 0; i < squares.length; i += 1) {
        for (let j = 0; j < squares[i].length; j += 1) {

            const squareKey = i * Config.brdSize + j;
            const isCurrentCell = currentCell[0] === i && currentCell[1] === j;

            squaresDiv.push(<Square winCell={checkWinCell(winCells, i, j)}
                value={squares[i][j]}
                row={i}
                col={j}
                isCurrentCell={isCurrentCell}
                handleClick={(row, col) => handleClick(row, col)}
                key={squareKey}/>);
        }
    }
    return <div className='container-board'>{squaresDiv}</div>;
}

export default Board;