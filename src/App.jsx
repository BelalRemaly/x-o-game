import { useState } from "react"
import PlayerInfo from "./components/playerInfo"
import GameBoard from "./components/GameBoard"
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GamerOver from "./components/gameOver";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = "O";
  }
  return currentPlayer
}

function App() {
  // const [selectPlayer, setSelectPlayer] = useState("X");
  const [gameTurns, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: 'player 1',
    O: 'player 2',
  })
  let winner;
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = intialGameBoard.map(row => [...row]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSympol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSympol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSympol = gameBoard[combination[2].row][combination[2].column];
    if (firstSquareSympol && firstSquareSympol === secondSquareSympol && firstSquareSympol === thirdSquareSympol) {
      winner = playerName[firstSquareSympol];
    }
  }
  const hasDrow = gameTurns.length === 9 && !winner;
  function handlePlayer(colIndex, rowIndex) {
    // setSelectPlayer((currentPlayer) => currentPlayer === "X" ? "O" : "X");
    setGameTurn((prevTruns) => {
      const currentPlayer = deriveActivePlayer(prevTruns);
      const updateTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTruns];
      return updateTurns;
    })
  }
  function handleRestart() {
    setGameTurn([]);
  }
  function handlePlayerName(symbol, newName) {
    setPlayerName(prevPlayers => {
      console.log(newName)
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo initalName="player 1" sympol="X" activePlayer={activePlayer === "X" ? "active" : null} onChangeName={handlePlayerName} />
          <PlayerInfo initalName="player 2" sympol="O" activePlayer={activePlayer === "O" ? "active" : null} onChangeName={handlePlayerName} />
        </ol>
        {(winner || hasDrow) && <GamerOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelect={handlePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App;
