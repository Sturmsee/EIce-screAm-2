namespace Iceshop {
    //var orders: Order[] = [];

    var canvas: HTMLCanvasElement;
    let timerElement: HTMLDivElement;

    var time: number;
    var gameTimer: number;
    var cooldown: number = 500;

    var posX: number = 2;
    export var width: number;
    export var height: number;

    var context: CanvasRenderingContext2D;
    const image: HTMLImageElement = new Image();
    const bubble: HTMLImageElement = new Image();
    const parchment: HTMLImageElement = new Image();

    var storedColor: string;

    var customerOrders: Order[] = [];
    var customers: Customer[] = [];

    image.src = "../media/Stall_Roof.png";
    bubble.src = "../media/speech_bubble.png";
    parchment.src = "../media/order_parchment.png";

    var order: Order;

    ////////////////////////////////
    //assigning variables on window load
    ////////////////////////////////
    window.onload = () => {
        canvas = <HTMLCanvasElement>document.querySelector("#canvas");
        context = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", onClick, false);
  

        canvas.width = window.innerWidth - window.innerWidth / 4;
        canvas.height = window.innerHeight - window.innerHeight / 4;
        width = canvas.width;
        height = canvas.height;

        time = performance.now();
        gameTimer = performance.now();

        console.log("loading...");

        renderCafe();


        timerElement = <HTMLDivElement>document.querySelector("#timer");
        timerElement.innerHTML = msToTime(performance.now() - gameTimer);
        console.log(timerElement);


        order = new Order(
            { name: 'empty', description: 'empty', price: 0, color: '#ffffff'},
            { name: 'empty', description: 'empty', price: 0, color: '#ffffff'},
            { name: 'empty', description: 'empty', price: 0, color: '#ffffff'}
        );
        
    };

    ////////////////////////////////
    //Cooldown
    ////////////////////////////////
    export function customerSpawnTimer() {
        if (time - performance.now() > cooldown) {
            time = performance.now();
            return true;
        }
    }

    ////////////////////////////////
    //Function to render Customer
    ////////////////////////////////
    export function renderCustomer() {

        if (order == customers[0].customOrder) {
            customers.pop();
            order = new Order(
                { name: 'empty', description: 'empty', price: 0, color: '#ffffff'},
                { name: 'empty', description: 'empty', price: 0, color: '#ffffff'},
                { name: 'empty', description: 'empty', price: 0, color: '#ffffff'}
            );
            let customer: Customer = new Customer(2);
            customer.customOrder = customer.generateOrder();
            customers.push(customer);
            customerOrders.push(customer.customOrder);
        }


        //console.log(customer.customOrder);


        customers[0].generateCustomer(context, posX);
    }

    ////////////////////////////////
    //Game Timer function
    ////////////////////////////////
    export function msToTime(duration: number) {
        var milliseconds = Math.floor((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        let hoursString = hours < 10 ? "0" + hours : hours;
        let minutesString = minutes < 10 ? "0" + minutes : minutes;
        let secondsString = seconds < 10 ? "0" + seconds : seconds;

        return (
            hoursString +
            ":" +
            minutesString +
            ":" +
            secondsString +
            "." +
            milliseconds
        );
    }

    ////////////////////////////////
    //Canvas Generator Functions
    ////////////////////////////////
    export function renderCafe() {
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
        context.rect(
            0,
            canvas.height - canvas.height / 3,
            canvas.width,
            canvas.height / 3
        );
        context.fillStyle = "grey";
        context.fill();
        context.strokeStyle = "black";
        context.stroke();

        // draw cafe
        //Booth
        context.beginPath();
        context.rect(
            canvas.width - canvas.width / 1.1,
            canvas.height - canvas.height / 2,
            canvas.width / 1.5,
            canvas.height / 3
        );
        context.rect(
            canvas.width - canvas.width / 1.1,
            canvas.height / 10,
            canvas.width / 25,
            canvas.height / 2
        );
        context.rect(
            canvas.width - canvas.width / 3.55,
            canvas.height / 10,
            canvas.width / 25,
            canvas.height / 2
        );
        context.fillStyle = "brown";
        context.fill();
        context.strokeStyle = "black";
        context.stroke();

        //Roof
        context.drawImage(
            image,
            canvas.width - canvas.width / 1.015,
            0,
            canvas.width / 1.25,
            canvas.height - canvas.height / 1.25
        );

        //Ice
        let count = iceCreamFlavours.length;
        let counter = 0;
        iceCreamFlavours.forEach((icecream) => {
            context.beginPath();
            context.rect(
                canvas.width -
                canvas.width / 1.15 +
                (canvas.width / 2 / count) * counter,
                canvas.height / 2.5,
                canvas.width / 2.25 / count,
                canvas.height / 5
            ); //Abstand muss noch bestimmt werden
            context.fillStyle = icecream.color;
            context.fill();
            context.strokeStyle = "black";
            context.stroke();
            counter++;
        });

        context.save();
    }

    export function spawnCustomer() {
        let coinFlip = Math.floor(Math.random());
        if (customerSpawnTimer() && coinFlip > 0) {
            renderCustomer();
        }
    }

    ////////////////////////////////
    //Game Loop
    ////////////////////////////////
    function gameLoop() {

        let lastTime: number = 0;
        while (true) {
            /*if (performance.now() - lastTime != 100) {
                continue;
            } else {
                lastTime = performance.now();
            }*/
            //console.log("loop");
            context.restore();
            showCustomerOrder();
            showWorkingOrder();
            spawnCustomer();
        }


    }

    ////////////////////////////////
    //Event um die Farbe herauszufinden
    ////////////////////////////////
    function onClick(e: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        storedColor = getColorAtPosition(mouseX, mouseY);
        console.log(`Stored Color: ${storedColor}`);
        colorToIce(storedColor);
    }

    export function getColorAtPosition(x: number, y: number): string {
        const imageData = context.getImageData(x, y, 1, 1).data;
        const r = imageData[0];
        const g = imageData[1];
        const b = imageData[2];
        const a = imageData[3];
        return rgbaToHex(r, g, b, a);
    }

    export function componentToHex(c: number): string {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    export function rgbaToHex(r: number, g: number, b: number, a: number): string {
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(
            b
        )}`;
    }

    ////////////////////////////////
    //Funktion zum Filtern der Farbe
    ////////////////////////////////
    export function colorToIce(color: string) {
        iceCreamFlavours.forEach((icecream) => {
            if (icecream.color == color) {
                if (order.ice1.name == "empty") {
                    //ice1 = icecream;
                    order.ice1 = icecream;
                } else if (order.ice2.name == "empty") {
                    //ice2 = icecream;
                    order.ice2 = icecream;
                } else if (order.ice3.name == "empty") {
                    //ice3 = icecream;
                    order.ice3 = icecream;
                } else {
                    console.log("This ice doesn't exist");
                }
                console.log("I am working");
            }
            
        });
        console.log(order.ice1.name, order.ice2.name, order.ice3.name);
    }

    ////////////////////////////////
    //Anzeigen der gemachten Bestellung
    ////////////////////////////////
    export function showWorkingOrder() {

        let posX = width - width / 3;
        let posY = height / 2;


        console.log(order);
        context.drawImage(parchment, posX - 100, posY - 200, 250, 350);

        context.beginPath();
        context.arc(posX + 25, posY - 70, 20, 0, Math.PI * 2, true);
        context.fillStyle = order.ice1.color;
        context.fill();
        context.strokeStyle = "black";
        context.stroke();

        context.beginPath();
        context.arc(posX + 25, posY - 50, 20, 0, Math.PI * 2, true);
        context.fillStyle = order.ice2.color;
        context.fill();
        context.strokeStyle = "black";
        context.stroke();

        context.beginPath();
        context.arc(posX + 25, posY - 25, 20, 0, Math.PI * 2, true);
        context.fillStyle = order.ice3.color;
        context.fill();
        context.strokeStyle = "black";
        context.stroke();

        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "brown";
        context.moveTo(posX + 5, posY - 15);
        context.lineTo(posX + 45, posY - 15);
        context.lineTo(posX + 25, posY + 70);
        context.lineTo(posX + 5, posY - 15);
        context.closePath();
        context.stroke();
        context.fill();
    }

    ////////////////////////////////
    //Anzeigen der Kundenbestellung
    ////////////////////////////////
    export function showCustomerOrder() {
        let posX = width - width / 5;
        let posY = height - height / 1.12;

        context.beginPath();
        context.drawImage(bubble, posX, 0, width / 6, height / 2);

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

}
