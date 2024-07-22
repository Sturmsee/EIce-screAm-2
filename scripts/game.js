"use strict";
var Iceshop;
(function (Iceshop) {
    //var orders: Order[] = [];
    var canvas;
    let timerElement;
    var time;
    var gameTimer;
    var cooldown = 500;
    var posX = 2;
    var context;
    const image = new Image();
    const bubble = new Image();
    var storedColor;
    var customerOrders = [];
    var customers = [];
    image.src = "../media/Stall_Roof.png";
    bubble.src = "../media/speech_bubble.png";
    ////////////////////////////////
    //assigning variables on window load
    ////////////////////////////////
    window.onload = () => {
        canvas = document.querySelector('#canvas');
        context = canvas.getContext('2d');
        canvas.addEventListener("click", onClick, false);
        /* canvas.addEventListener('mousemove', (event: MouseEvent) => {
             const rect = canvas.getBoundingClientRect();
             const mouseX = event.clientX - rect.left;
             const mouseY = event.clientY - rect.top;
             const color = getColorAtPosition(mouseX, mouseY);
             colorInfo.innerText = `${color}`;
         }); */
        canvas.width = window.innerWidth - window.innerWidth / 4;
        canvas.height = window.innerHeight - window.innerHeight / 4;
        Iceshop.width = canvas.width;
        Iceshop.height = canvas.height;
        time = performance.now();
        gameTimer = performance.now();
        console.log("loading...");
        renderCafe();
        renderCustomer();
        showCustomerOrder();
        timerElement = document.querySelector('#timer');
        timerElement.innerHTML = msToTime(performance.now() - gameTimer);
        console.log(timerElement);
        //gameLoop();
    };
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
        let customer = new Iceshop.Customer(2);
        customer.customOrder = customer.generateOrder();
        console.log(customer.customOrder);
        customerOrders.push(customer.customOrder);
        customer.generateCustomer(context, posX);
    }
    ////////////////////////////////
    //Game Timer function
    ////////////////////////////////
    function msToTime(duration) {
        var milliseconds = Math.floor((duration % 1000) / 100), seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
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
        context.fillStyle = "cyan";
        context.fill();
        //Sidewalk
        context.beginPath();
        context.rect(0, canvas.height - canvas.height / 3, canvas.width, canvas.height / 3);
        context.fillStyle = "grey";
        context.fill();
        context.strokeStyle = "black";
        context.stroke();
        // draw cafe
        //Booth
        context.beginPath();
        context.rect(canvas.width - canvas.width / 1.1, canvas.height - canvas.height / 2, canvas.width / 1.5, canvas.height / 3);
        context.rect(canvas.width - canvas.width / 1.1, canvas.height / 10, canvas.width / 25, canvas.height / 2);
        context.rect(canvas.width - canvas.width / 3.55, canvas.height / 10, canvas.width / 25, canvas.height / 2);
        context.fillStyle = "brown";
        context.fill();
        context.strokeStyle = "black";
        context.stroke();
        //Roof
        context.drawImage(image, canvas.width - canvas.width / 1.015, 0, canvas.width / 1.25, canvas.height - canvas.height / 1.25);
        //Ice
        let count = Iceshop.iceCreamFlavours.length;
        let counter = 0;
        Iceshop.iceCreamFlavours.forEach(icecream => {
            context.beginPath();
            context.rect((canvas.width - canvas.width / 1.15) + ((canvas.width / 2) / count) * counter, canvas.height / 2.5, (canvas.width / 2.25) / count, canvas.height / 5); //Abstand muss noch bestimmt werden
            context.fillStyle = icecream.color;
            context.fill();
            context.strokeStyle = "black";
            context.stroke();
            counter++;
        });
        context.save();
    }
    function spawnCustomer() {
        let coinFlip = Math.floor(Math.random());
        if (customerSpawnTimer() && coinFlip > 0) {
            renderCustomer();
        }
    }
    ////////////////////////////////
    //Game Loop
    ////////////////////////////////
    function gameLoop() {
        let curserValue;
        let lastTime = 0;
        while (true) {
            if (performance.now() - lastTime > 100) {
                continue;
            }
            else {
                lastTime = performance.now();
            }
            console.log("loop");
        }
    }
    ////////////////////////////////
    //Event um die Farbe herauszufinden
    ////////////////////////////////
    function onClick(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        storedColor = getColorAtPosition(mouseX, mouseY);
        console.log(`Stored Color: ${storedColor}`);
    }
    function getColorAtPosition(x, y) {
        const imageData = context.getImageData(x, y, 1, 1).data;
        const r = imageData[0];
        const g = imageData[1];
        const b = imageData[2];
        const a = imageData[3];
        return rgbaToHex(r, g, b, a);
    }
    function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
    function rgbaToHex(r, g, b, a) {
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${componentToHex(a)}`;
    }
    ////////////////////////////////
    //Funktion zum Filtern der Farbe
    ////////////////////////////////
    function colorToIce(color) {
        let ice1;
        let ice2;
        let ice3;
        let order = new Iceshop.Order(ice1, ice2, ice3);
        Iceshop.iceCreamFlavours.forEach(icecream => {
            if (icecream.color == color) {
                if (ice1 == null) {
                    ice1 = icecream;
                    order.ice1 = icecream;
                }
                else if (ice2 == null) {
                    ice2 = icecream;
                    order.ice2 = icecream;
                }
                else if (ice3 == null) {
                    ice3 = icecream;
                    order.ice3 = icecream;
                }
                else {
                    console.log("This ice doesn't exist");
                }
            }
        });
    }
    ////////////////////////////////
    //Anzeigen der gemachten Bestellung
    ////////////////////////////////
    function showWorkingOrder() {
        let order = customerOrders[0];
        let posX = Iceshop.width - Iceshop.width / 3;
        let posY = Iceshop.height / 2;
        context.beginPath();
        context.rect(posX - 52, posY - 32, 104, 154);
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.rect(posX - 50, posY - 30, 100, 150);
        context.fillStyle = "lightgrey";
        context.fill();
        context.beginPath();
        context.arc(posX, posY, 20, 0, Math.PI * 2, true);
        context.fillStyle = customerOrders[0].ice1.color;
        context.fill();
        context.beginPath();
        context.arc(posX, posY + 20, 20, 0, Math.PI * 2, true);
        context.fillStyle = customerOrders[0].ice2.color;
        context.fill();
        context.beginPath();
        context.arc(posX, posY + 45, 20, 0, Math.PI * 2, true);
        context.fillStyle = customerOrders[0].ice3.color;
        context.fill();
    }
    ////////////////////////////////
    //Anzeigen der Kundenbestellung
    ////////////////////////////////
    function showCustomerOrder() {
        let order = customerOrders[0];
        let posX = Iceshop.width - Iceshop.width / 5;
        let posY = Iceshop.height - Iceshop.height / 1.12;
        context.beginPath();
        context.drawImage(bubble, posX, 0, Iceshop.width / 6, Iceshop.height / 2);
        //Rand zur besseren Übersicht
        context.beginPath();
        context.arc(posX + 120, posY, 20, 0, Math.PI * 2, true);
        context.strokeStyle = "black";
        context.stroke();
        //Eiskugel 1
        context.beginPath();
        context.arc(posX + 120, posY, 20, 0, Math.PI * 2, true);
        context.fillStyle = customerOrders[0].ice1.color;
        context.fill();
        //Rand zur besseren Übersicht
        context.beginPath();
        context.arc(posX + 120, posY + 20, 20, 0, Math.PI * 2, true);
        context.strokeStyle = "black";
        context.stroke();
        //Eiskugel 2
        context.beginPath();
        context.arc(posX + 120, posY + 20, 20, 0, Math.PI * 2, true);
        context.fillStyle = customerOrders[0].ice2.color;
        context.fill();
        //Rand zur besseren Übersicht
        context.beginPath();
        context.arc(posX + 120, posY + 45, 20, 0, Math.PI * 2, true);
        context.strokeStyle = "black";
        context.stroke();
        //Eiskugel 3
        context.beginPath();
        context.arc(posX + 120, posY + 45, 20, 0, Math.PI * 2, true);
        context.fillStyle = customerOrders[0].ice3.color;
        context.fill();
        //Rand zur Übersicht
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "brown";
        context.moveTo(posX + 120, posY + 140);
        context.lineTo(posX + 100, posY + 55);
        context.lineTo(posX + 140, posY + 55);
        context.lineTo(posX + 120, posY + 140);
        context.closePath();
        context.stroke();
        context.fill();
    }
})(Iceshop || (Iceshop = {}));
