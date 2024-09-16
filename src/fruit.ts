export class Fruit {
    name: string;
    quantity: number;
    id: number;

    constructor(name: string, quantity: number) {
        this.name = name;
        this.quantity = quantity;
        this.id = Date.now() + Math.floor(Math.random() * 100);
    }
}

