"use strict";
var iceshop;
(function (iceshop) {
    //var orders: Order[] = [];
    var canvas;
    var time;
    var cooldown = 500;
    window.onload = () => {
        canvas = document.querySelector('canvas');
        time = performance.now();
    };
    function customerSpawnTimer() {
        if (time - performance.now() > cooldown) {
            time = performance.now();
            return true;
        }
    }
})(iceshop || (iceshop = {}));
