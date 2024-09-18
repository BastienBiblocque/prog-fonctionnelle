import { addFruitToStock, deleteFruit, sellFruit, showStock, countTotalFruits, type Fruit } from '../src/exo3';
import { expect, test, describe, beforeEach } from "bun:test";

describe("Stock management", () => {

    let initialStock: Fruit[];

    beforeEach(() => {
        initialStock = [
            { id: 1, name: "Pomme", quantity: 10 },
            { id: 2, name: "Poire", quantity: 5 },
            { id: 3, name: "Ananas", quantity: 8 }
        ];
    });

    test("should add a fruit to stock", () => {
        const updatedStock = addFruitToStock(initialStock, "Pomme", 5);
        expect(updatedStock).toEqual([
            { id: 1, name: "Pomme", quantity: 15 }, // Pomme avec quantité mise à jour
            { id: 2, name: "Poire", quantity: 5 },
            { id: 3, name: "Ananas", quantity: 8 }
        ]);
    });

    test("should add a new fruit to stock", () => {
        const updatedStock = addFruitToStock(initialStock, "Citron", 7);
        expect(updatedStock).toEqual([
            { id: 1, name: "Pomme", quantity: 10 },
            { id: 2, name: "Poire", quantity: 5 },
            { id: 3, name: "Ananas", quantity: 8 },
            { id: 4, name: "Citron", quantity: 7 }
        ]);
    });

    test("should delete a fruit from stock", () => {
        const updatedStock = deleteFruit(initialStock, "Ananas");
        expect(updatedStock).toEqual([
            { id: 1, name: "Pomme", quantity: 10 },
            { id: 2, name: "Poire", quantity: 5 }
        ]);
    });

    test("should sell a fruit", () => {
        const { updatedFruits, message } = sellFruit(initialStock, "Pomme", 3);
        expect(updatedFruits).toEqual([
            { id: 1, name: "Pomme", quantity: 7 }, // Pomme avec quantité réduite
            { id: 2, name: "Poire", quantity: 5 },
            { id: 3, name: "Ananas", quantity: 8 }
        ]);
        expect(message).toBe("3 Pomme sold");
    });

    test("should fail to sell due to insufficient quantity", () => {
        const { updatedFruits, message } = sellFruit(initialStock, "Pomme", 20);
        expect(updatedFruits).toEqual(initialStock);
        expect(message).toBe("Not enough Pomme or unknown fruit");
    });

    test("should show stock", () => {
        const stockMessages = showStock(initialStock);
        expect(stockMessages).toEqual([
            "Fruit : Pomme | Quantity : 10",
            "Fruit : Poire | Quantity : 5",
            "Fruit : Ananas | Quantity : 8"
        ]);
    });

    test("should count total fruits in stock", () => {
        const total = countTotalFruits(initialStock);
        expect(total).toBe(23); // 10 + 5 + 8 = 23
    });
});
