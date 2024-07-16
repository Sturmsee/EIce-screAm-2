namespace iceshop {

//var orders: Order[] = [];

var canvas: HTMLCanvasElement;
var time: number;
var cooldown: number = 500;

window.onload = () => {
    canvas = <HTMLCanvasElement>document.querySelector('canvas');
    time = performance.now();
}

function customerSpawnTimer() {
    if (time - performance.now() > cooldown) {
        
        time = performance.now();
        return true;
    }
}



}