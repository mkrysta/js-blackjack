import "./index.css";
import Game from "./game";
import GameStates from "./gameStates";

let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
let game = null;

changeVisibility(hitButton);
changeVisibility(stayButton);

newGameButton.addEventListener("click", () => {
    game = new Game();
    textArea.innerText = game.gameDescription();
    refreshInterface(true);
});

hitButton.addEventListener("click", () => {
    game.humanPlayerMove();
    textArea.innerText = game.gameDescription();
    refreshInterface(false);
});

stayButton.addEventListener("click", () => {
    game.playerPass();
    textArea.innerText = game.gameDescription();
    refreshInterface(false);
});

function sum(a, b) {
    return a + b;
}

function refreshInterface(force) {
    if (force || game.gameState === GameStates.over) {
        changeVisibility(newGameButton);
        changeVisibility(hitButton);
        changeVisibility(stayButton);
    }
}

function changeVisibility(element) {
    if (element != null && element.style != null) {
        let style = (element.style.display === "none" ? "inline" : "none");
        element.style.display = style;
    }
}

export default sum;