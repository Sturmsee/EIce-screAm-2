namespace Iceshop {

    export class Game {
        
        private lastTime: number;
        private canvas: HTMLCanvasElement;
        private ctx2D: CanvasRenderingContext2D;
        
        constructor() {
            this.lastTime = 0;
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.ctx2D = <CanvasRenderingContext2D>this.canvas.getContext("2d");

            requestAnimationFrame(this.gameLoop.bind(this));

        }

        private gameLoop(timestamp: number) {
            const deltaTime = (timestamp - this.lastTime) / 1000;
            this.lastTime = timestamp;
    
            renderCafe();
            //showCustomerOrder();
            showWorkingOrder();
            spawnCustomer();
    
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }
}