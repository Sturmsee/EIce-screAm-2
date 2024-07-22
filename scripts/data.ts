namespace Iceshop {

export class Customer {

    //img: string;
    mood: number;
    customOrder!: Order;
    orderFinished: boolean;
    spawnTime: number;

    constructor(mood: number) {
        //this.img = img;
        this.mood = mood;
        this.orderFinished = false;
        this.spawnTime = performance.now();
    }

    generateOrder(){
        this.customOrder = new Order(iceCreamFlavours[Math.floor(Math.random()*iceCreamFlavours.length)],
            iceCreamFlavours[Math.floor(Math.random()*iceCreamFlavours.length)],
            iceCreamFlavours[Math.floor(Math.random()*iceCreamFlavours.length)]);
        return this.customOrder;
    }

    
    generateCustomer(cContext: CanvasRenderingContext2D, _animateX: number) {
        let animateX = _animateX;
        let centerY = height - (height/4);
        let radius = 150;
        let centerX = -radius/1.2 + animateX;
        //let centerX = 200;

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
        if(this.mood > 1) {
            cContext.beginPath();
            cContext.arc(centerX, centerY, 100, 0, Math.PI, false);
            cContext.lineWidth = 5;
            cContext.stroke();
        }
        else if(this.mood < 1) {
            cContext.beginPath();
            cContext.arc(centerX, centerY + radius/4, 100, Math.PI, Math.PI * 2, false);
            cContext.lineWidth = 5;
            cContext.stroke();
        }
        else {
            cContext.beginPath();
            cContext.fillRect(centerX - 50, centerY + radius/4, 100, 20);
            cContext.lineWidth = 5;
            cContext.stroke();
        }

        if((centerX >= width / 2) && !this.orderFinished) {
            animateX = 0;
            if(performance.now() - this.spawnTime  > 5000) {
                this.mood -= 1;
                this.spawnTime = performance.now();
            }
        } else {
            animateX = _animateX;
        }
    }

    
}

export class Order{

    ice1: IceCream;
    ice2: IceCream;
    ice3: IceCream;

    constructor(ice1: IceCream,ice2: IceCream,ice3: IceCream){
        this.ice1 = ice1;
        this.ice2 = ice2;
        this.ice3 = ice3;
    }


}

export interface IceCream {
    name: string;
    description: string;
    price: number;
    color: string;

}

export const iceCreamFlavours: IceCream[] = [
    { name: 'Vanille', description: 'Vanillegeschmack', price: 1.2, color: '#ffffcc'},
    { name: 'Schokolade', description: 'Schokoladengeschmack', price: 1.2, color: '#8b4513'},
    { name: 'Erdbeere', description: 'Erbeergeschmack', price: 1.2, color: '#ee6363'},
    { name: 'Zitrone', description: 'Zitronengeschmack', price: 1.2, color: '#fffaf0'},
    { name: 'Pistazie', description: 'Pistaziengeschmack', price: 1.2, color: '#8fbc8f'},
    { name: 'Mango', description: 'Mangogeschmack', price: 1.2, color: '#ffa500'},
    { name: 'Schlumpf', description: 'Blaues schlumpfiges irgendwas', price: 1.2, color: '#1e90ff'}
];
}