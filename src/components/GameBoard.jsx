// import { useState } from "react";

export default function GameBoard({ onSelect, board }) {

    // const [gameBoard, setGameBoaerd] = useState(intialGameBoard);
    // function handleGameBoard(rowIndex, playerIndex) {
    //     setGameBoaerd((prevGameBoard) => {
    //     const updateGameBoaerd = [...prevGameBoard.map(innerArray => [...innerArray])];
    //     updateGameBoaerd[rowIndex][playerIndex] = activeSymbol;
    //     return updateGameBoaerd;
    //     });
    //     onSelect();
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelect(colIndex, rowIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
