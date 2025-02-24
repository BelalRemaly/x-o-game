import { useState } from "react";
export default function PlayerInfo({ initalName, sympol, activePlayer, onChangeName }) {
    const [isEditing, setIsediting] = useState(false);
    const [name, setName] = useState(initalName);
    let btn = "Edit";
    let playerName = <span className="player-name">{name}</span>;
    function handleName(event) {
        console.log(event)
        setName(event.target.value)
    }
    function handleEditeClick() {
        setIsediting((editing) => !editing);
        if (isEditing) {
            onChangeName(sympol, name);
        }
    }
    if (isEditing) {
        playerName = < input type="text" important defaultValue={name} onChange={handleName} />
        btn = "Save";
    }
    return (
        <li className={activePlayer}>
            <span className="player">
                {playerName}
                <span className="player-sympol">{sympol}</span>
            </span>
            <button onClick={handleEditeClick}>{btn}</button>
        </li>
    );
}