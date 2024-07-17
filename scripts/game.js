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
    ////////////////////////////////
    //assigning variables on window load
    ////////////////////////////////
    window.onload = () => {
        canvas = document.querySelector('#canvas');
        context = canvas.getContext('2d');
        canvas.width = window.innerWidth / 2;
        canvas.height = window.innerHeight / 2;
        Iceshop.width = canvas.width;
        time = performance.now();
        gameTimer = performance.now();
        console.log("loading...");
        timerElement = document.querySelector('#timer');
        //timerElement.innerHTML = msToTime(performance.now() - gameTimer);
        console.log(timerElement);
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
        let customer = new Iceshop.Customer(0);
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
    }
    function spawnCustomer() {
        let coinFlip = Math.floor(Math.random());
        if (customerSpawnTimer() && coinFlip > 0) {
            renderCustomer();
        }
    }
})(Iceshop || (Iceshop = {}));
