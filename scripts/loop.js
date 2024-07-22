"use strict";
var Iceshop;
(function (Iceshop) {
    class Game {
        constructor() {
            this.lastTime = 0;
            this.canvas = document.getElementById("canvas");
            this.ctx2D = this.canvas.getContext("2d");
            requestAnimationFrame(this.gameLoop.bind(this));
        }
        gameLoop(timestamp) {
            const deltaTime = (timestamp - this.lastTime) / 1000;
            this.lastTime = timestamp;
            Iceshop.renderCafe();
            //showCustomerOrder();
            Iceshop.showWorkingOrder();
            Iceshop.spawnCustomer();
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }
    Iceshop.Game = Game;
})(Iceshop || (Iceshop = {}));
