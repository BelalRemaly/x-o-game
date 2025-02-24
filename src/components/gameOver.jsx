export default function GamerOver({ winner, onRestart }) {
    return (
        <div id="game-over">
            <h2>Gamer Over</h2>
            {winner ? <p>{winner} win !</p> : <p>it's Drow! </p>}
            <p><button onClick={onRestart}>restart!</button></p>
        </div>
    );
}