"use strict";
var startButton;
var ruleButton;
window.onload = () => {
    ruleButton = document.querySelector("rules");
    startButton = document.querySelector("start");
    startButton.addEventListener("click", () => OnClick(event, "game.html"));
};
function OnClick(event, page) {
    window.location.href = page;
}
