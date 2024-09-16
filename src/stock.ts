import { Fruit } from './fruit';
import {Logger} from "./logger.ts"; // Si ta classe Fruit est dans un fichier séparé

export class Stock {
    private fruits: Fruit[]; // Liste des fruits dans le stock

    constructor() {
        this.fruits = [];
    }

    // Méthode pour ajouter ou mettre à jour un fruit dans le stock par son ID
    addFruit(fruit: Fruit): void {
        const existingFruit = this.fruits.find(f => f.id === fruit.id);
        if (existingFruit) {
            // Si le fruit existe déjà (par ID), on met à jour la quantité
            existingFruit.quantity += fruit.quantity;
            Logger.info(`${fruit.name} (ID: ${fruit.id}) mis à jour avec ${fruit.quantity} unités supplémentaires.`);
        } else {
            // Si le fruit n'existe pas, on l'ajoute au stock
            this.fruits.push(fruit);
            Logger.info(`${fruit.name} (ID: ${fruit.id}) ajouté au stock avec ${fruit.quantity} unités.`);
        }
    }

    getFruitByName(fruitName: string): Fruit | undefined {
        return this.fruits.find(f => f.name === fruitName);
    }

    sellFruit(fruitId: number, quantity: number): Window {
        let fruit = this.fruits.find(f => f.id === fruitId);
        if (!fruit) {
            throw new Error();
        }
        if (fruit.quantity < quantity) {
            throw new Error();
        }
        fruit.quantity = fruit.quantity - quantity;
        return self;
    }

    listFruits(): void {
        if (this.fruits.length === 0) {
            Logger.info("Le stock est vide.");
        } else {
            Logger.info("Contenu du stock :");
            this.fruits.forEach(fruit => {
                Logger.info(`${fruit.name} (ID: ${fruit.id}): ${fruit.quantity} unités.`);
            });
        }
    }

    updateStock(fruitId: number, quantity: number) {
        let fruit = this.fruits.find(f => f.id === fruitId);
        if (!fruit) {
            throw new Error();
        }
        fruit.quantity = fruit.quantity + quantity;
        return self;
    }

    removeFruit(fruitId: number) {
        this.fruits = this.fruits.filter(f => f.id !== fruitId);
    }

    checkFruit(fruitName: string, quantity: number): boolean {
        const fruit = this.fruits.find(f => f.name === fruitName);

        if (!fruit) {
            Logger.info(`Le fruit ${fruitName} n'est pas disponible dans le stock.`);
            return false;
        }

        if (fruit.quantity >= quantity) {
            Logger.info(`Le fruit ${fruitName} est disponible avec une quantité suffisante (${fruit.quantity} unités disponibles).`);
            return true;
        } else {
            Logger.info(`Quantité insuffisante de ${fruitName}. Il reste ${fruit.quantity} unités.`);
            return false;
        }
    }
}
