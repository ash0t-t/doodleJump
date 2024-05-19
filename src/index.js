import { Game } from './Game.js';

export let game;

window.onload = function() {
    document.addEventListener("keydown", startGame);
}

function startGame(e) {
    if (e.code === "Space") {
        document.removeEventListener("keydown", startGame);
        game = new Game();
    }
}
