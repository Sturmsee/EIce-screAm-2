namespace iceshop {

class Customer {

    img: string;
    mood: number;
    customOrder!: Order;

    constructor(img: string, mood: number) {
        this.img = img;
        this.mood = mood;
    }

    generateOrder(){
        this.customOrder.ice1 = iceCreamFlavours[Math.floor(Math.random()*iceCreamFlavours.length)];
        this.customOrder.ice2 = iceCreamFlavours[Math.floor(Math.random()*iceCreamFlavours.length)];
        this.customOrder.ice3 = iceCreamFlavours[Math.floor(Math.random()*iceCreamFlavours.length)];
        return this.customOrder;
    }

    generateCustomer(cContext: CanvasRenderingContext2D){
        const centerY = 200;
        const centerX = 200;
        const radius = 200;

        //Draw Face
        cContext.beginPath();
        cContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        cContext.fillStyle = "white";
        cContext.fill();
        cContext.stroke();

        //Draw left Eye
        cContext.beginPath();
        cContext.arc(centerX - 75, centerY - 75, 25, 0, Math.PI * 2, true);
        cContext.fillStyle = "black";
        cContext.fill();

        //Draw right Eye
        cContext.beginPath();
        cContext.arc(centerX + 75, centerY - 75, 25, 0, Math.PI * 2, true);
        cContext.fillStyle = "black";
        cContext.fill();

        //Draw Mouth
        cContext.beginPath();
        cContext.arc(centerX, centerY, 100, 0, Math.PI, false);
        cContext.lineWidth = 5;
        cContext.stroke();
    }
}

class Order{

    ice1: IceCream;
    ice2: IceCream;
    ice3: IceCream;

    constructor(ice1: IceCream,ice2: IceCream,ice3: IceCream){
        this.ice1 = ice1;
        this.ice2 = ice2;
        this.ice3 = ice3;
    }
}

interface IceCream {
    name: string;
    description: string;
    price: number;
}

const iceCreamFlavours: IceCream[] = [
    { name: 'Vanille', description: 'Vanillegeschmack', price: 1.2},
    { name: 'Schokolade', description: 'Schokoladengeschmack', price: 1.2},
    { name: 'Erdbeere', description: 'Erbeergeschmack', price: 1.2},
    { name: 'Straciatella', description: 'Straciatellageschmack', price: 1.2},
    { name: 'Zitrone', description: 'Zitronengeschmack', price: 1.2},
    { name: 'Pistazie', description: 'Pistaziengeschmack', price: 1.2},
    { name: 'Mango', description: 'Mangogeschmack', price: 1.2},
    { name: 'Schlumpf', description: 'Blaues schlumpfiges irgendwas', price: 1.2}
];
}