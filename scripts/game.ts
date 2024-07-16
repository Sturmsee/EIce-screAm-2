
namespace Iceshop {


//var orders: Order[] = [];

var canvas: HTMLCanvasElement;
let timerElement: HTMLDivElement;

var time: number;
var gameTimer: number;
var cooldown: number = 500;

var context: CanvasRenderingContext2D;




window.onload = () => {
    canvas = <HTMLCanvasElement>document.querySelector('#canvas');
    time = performance.now();
    gameTimer = performance.now();
    context = <CanvasRenderingContext2D>canvas.getContext('2d');

    console.log("loading...");

    timerElement = <HTMLDivElement>document.querySelector('#timer');
    //timerElement.innerHTML = msToTime(performance.now() - gameTimer);
    console.log(timerElement);
    
}


function customerSpawnTimer() {
    if (time - performance.now() > cooldown) {
        
        time = performance.now();
        return true;
    }
}

function render() {
    let customer: Customer = new Customer(0);
    customer.generateCustomer(context);
}

function msToTime(duration: number) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    let hoursString = (hours < 10) ? "0" + hours : hours;
    let minutesString = (minutes < 10) ? "0" + minutes : minutes;
    let secondsString = (seconds < 10) ? "0" + seconds : seconds;
  
    return hoursString + ":" + minutesString + ":" + secondsString + "." + milliseconds;
}

}