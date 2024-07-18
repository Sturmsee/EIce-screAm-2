namespace Iceshop {


//var orders: Order[] = [];

var canvas: HTMLCanvasElement;
let timerElement: HTMLDivElement;

var time: number;
var gameTimer: number;
var cooldown: number = 500;

var posX: number = 2;
export var width: number;

var context: CanvasRenderingContext2D;
const image: HTMLImageElement = new Image(80, 80);

image.src = "../media/Stall_Roof.png";

////////////////////////////////
//assigning variables on window load
////////////////////////////////
window.onload = () => {
    canvas = <HTMLCanvasElement>document.querySelector('#canvas');
    context = <CanvasRenderingContext2D>canvas.getContext('2d');

    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
    width = canvas.width;

    time = performance.now();
    gameTimer = performance.now();
    


    console.log("loading...");

    timerElement = <HTMLDivElement>document.querySelector('#timer');
    //timerElement.innerHTML = msToTime(performance.now() - gameTimer);
    console.log(timerElement);
    
}

////////////////////////////////
//Cooldown
////////////////////////////////
function customerSpawnTimer() {
    if (time - performance.now() > cooldown) {
        
        time = performance.now();
        return true;
    }
}

////////////////////////////////
//Function to render Customer
////////////////////////////////
function renderCustomer() {
    let customer: Customer = new Customer(0);
    customer.generateCustomer(context, posX);
}

////////////////////////////////
//Game Timer function
////////////////////////////////
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

////////////////////////////////
//Canvas Generator Functions
////////////////////////////////
function renderCafe() {

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    //draw background
    //Sky
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "lightblue";
    context.fill();

    //Sidewalk
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height/3);
    context.fillStyle = "grey";
    context.fill();
    
    // draw cafe
    //Booth
    context.beginPath();
    context.rect(canvas.height/3, canvas.height/3, canvas.width/2, canvas.height/3);
    context.fillStyle = "brown";
    context.fill();

    //Roof
    context.drawImage(image, canvas.width/4, canvas.height/4);
    
    //Ice
    iceCreamFlavours.forEach(icecream => {
   
        context.beginPath();
        context.rect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/3); //Abstand muss noch bestimmt werden
        context.fillStyle = icecream.color;
        context.fill();  
    });
 

    context.save();
}

function spawnCustomer() {
    let coinFlip = Math.floor(Math.random());
    if(customerSpawnTimer() && coinFlip > 0) { 
       renderCustomer(); 
    }

}

}