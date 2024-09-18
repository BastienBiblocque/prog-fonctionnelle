// Définition du type pour les fruits
export type Fruit = {
    id: number;
    name: string;
    quantity: number;
};

// Fonction pour ajouter un fruit au stock
export function addFruitToStock(fruits: Fruit[], name: string, quantity: number): Fruit[] {
    const existingProduct = fruits.find((p) => p.name === name);

    if (existingProduct) {
        return fruits.map((fruit) =>
            fruit.name === name
                ? { ...fruit, quantity: fruit.quantity + quantity }
                : fruit
        );
    } else {
        const newFruit = { id: fruits.length + 1, name, quantity };
        return [...fruits, newFruit];
    }
}

// Fonction pour supprimer un fruit du stock
export function deleteFruit(fruits: Fruit[], name: string): Fruit[] {
    return fruits.filter((p) => p.name !== name);
}

// Fonction pour vendre un fruit
export function sellFruit(fruits: Fruit[], name: string, quantity: number): { updatedFruits: Fruit[], message: string } {
    const fruit = fruits.find((p) => p.name === name);

    if (fruit && fruit.quantity >= quantity) {
        const updatedFruits = fruits.map((f) =>
            f.name === name
                ? { ...f, quantity: f.quantity - quantity }
                : f
        );
        return { updatedFruits, message: `${quantity} ${name} sold` };
    } else {
        return { updatedFruits: fruits, message: `Not enough ${name} or unknown fruit` };
    }
}

// Fonction pour afficher le stock
export function showStock(fruits: Fruit[]): string[] {
    return fruits.map((fruit) => `Fruit : ${fruit.name} | Quantity : ${fruit.quantity}`);
}

// Fonction pour compter le total de fruits dans le stock
export function countTotalFruits(fruits: Fruit[]): number {
    return fruits.reduce((total, fruit) => total + fruit.quantity, 0);
}
