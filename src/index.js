import { Game } from "./Game.js";

export let game;

window.onload = function () {
  document.getElementById("start-note").style.display = "block";
  document.addEventListener("keydown", startGame);
};

function startGame(e) {
  if (e.code == "Space") {
    document.removeEventListener("keydown", startGame);
    document.getElementById("start-note").style.display = "none";
    game = new Game();
  }
}
