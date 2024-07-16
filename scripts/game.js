"use strict";
var Iceshop;
(function (Iceshop) {
    //var orders: Order[] = [];
    var canvas;
    let timerElement;
    var time;
    var gameTimer;
    var cooldown = 500;
    var context;
    ////////////////////////////////
    //assigning variables on window load
    ////////////////////////////////
    window.onload = () => {
        canvas = document.querySelector('#canvas');
        time = performance.now();
        gameTimer = performance.now();
        context = canvas.getContext('2d');
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
    function render() {
        let customer = new Iceshop.Customer(0);
        customer.generateCustomer(context);
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
})(Iceshop || (Iceshop = {}));
