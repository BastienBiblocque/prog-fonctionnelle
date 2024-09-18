import orderData from '../data/orders.json';
import pizzaData from '../data/pizzas.json';

// Définir le type Pizza
type Pizza = {
    id: string;
    name: string;
    price: number;
    base: string;
    ingredients: string[];
};

type OrderItem = {
    pizzaId: string;
    quantity: number;
    price: number;
    amount: number;
};

type Order = {
    id: string;
    orderedAt: string;
    readyAt: string;
    orderType: string;
    status: string;
    amount: number;
    totalAmount: number;
    items: OrderItem[];
    deliveryCosts: number;
};

const pizzas: Pizza[] = [];

pizzaData.forEach((item: Pizza) => {
    pizzas.push(item);
});

const orders: Order[] = orderData as Order[];

export const calculatePizzaPriceAverage = (pizzas: Pizza[]): number => {
    const total = pizzas.reduce((sum, pizza) => sum + pizza.price, 0);
    return total / pizzas.length;
};

const findMostOrderedPizza = (orders: Order[]): string | null => {
    const pizzaOrderCount: Record<string, number> = {};

    orders.forEach(order => {
        order.items.forEach(item => {
            pizzaOrderCount[item.pizzaId] = (pizzaOrderCount[item.pizzaId] || 0) + item.quantity;
        });
    });

    const keys = Object.keys(pizzaOrderCount);
    if (keys.length === 0) return null;

    return keys.reduce((a, b) => pizzaOrderCount[a] > pizzaOrderCount[b] ? a : b, keys[0]);
};

const countUniqueBases = (pizzas: Pizza[]): number => {
    const allBases = pizzas.map(pizza => pizza.base);
    const uniqueBases = Array.from(new Set(allBases));
    return uniqueBases.length;
};


const countTomatoBasePizzas = (pizzas: Pizza[]): number =>
    pizzas.filter(pizza => pizza.base.toLowerCase() === 'tomate').length;

const countDifferentIngredients = (pizzas: Pizza[]): number =>
{
    return [...new Set(getAllIngredients(pizzas))].length;
    /*
    let allIngredients = pizzas.map(pizza => pizza.ingredients);
    const ingredientArray: string[] = [];
    allIngredients.forEach((ingredients) => {
        ingredients.forEach(ingredient => {
            ingredientArray.push(ingredient);
        })
    })
    return [...new Set(ingredientArray)].length;*/
}

const getAllIngredients = (pizzas: Pizza[]): string[] => {
    return pizzas.flatMap(pizza => pizza.ingredients);
}

function getCountIngredients(ingredients: string[]): { [key: string]: number } {
    const counts: { [key: string]: number } = {};

    for (const ingredient of ingredients) {
        counts[ingredient] = (counts[ingredient] || 0) + 1;
    }

    return counts;
}

const findIngredientAlone = (pizzas: Pizza[]): string => {
    const ingredients: string[] = getAllIngredients(pizzas);
    const counts = getCountIngredients(ingredients);

    const leastUsedIngredients = Object.entries(counts)
        .filter(([ingredient, count]) => count === 1)
        .map(([ingredient]) => ingredient);

    return leastUsedIngredients.join(', ');
}

const findLessThan4 = (pizzas: Pizza[]): number => {
    return pizzas.filter(pizza => pizza.ingredients.length < 4).length;
}

const getAllPizzaId = (pizzas:Pizza[]): string[] => {
    pizzas.flatMap(pizza => pizza.id);
    return pizzas.flatMap(pizza => pizza.id);
}

const findDontSellPizza = (pizzas: Pizza[], orders: Order[]): string[] => {
    const pizzasId = getAllPizzaId(pizzas);
    const sellPizzaId = [...new Set(orders.flatMap(order => order.items.flatMap(pizza => pizza.pizzaId)))];
    return pizzasId.filter(element => !sellPizzaId.includes(element));
}

function averageOrder(orders: Order[]): number {
    return  (orders.reduce((sum, order) => sum + order.totalAmount, 0)) / orders.length;
}

function averageTomatePizza(orders: Order[], pizzas: Pizza[]): number
{
    const tomatoPizzas = pizzas.filter(pizza => pizza.base.toLowerCase() === "tomate");

    const tomatoPizzaOrders = orders.flatMap(order =>
        order.items.filter(item => tomatoPizzas.some(pizza => pizza.id === item.pizzaId))
    );

    const totalTomatoPizzaPrice = tomatoPizzaOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const totalTomatoPizzaCount = tomatoPizzaOrders.reduce((count, item) => count + item.quantity, 0);

    return totalTomatoPizzaCount > 0 ? totalTomatoPizzaPrice / totalTomatoPizzaCount : 0;
}

function mostSoldPizzas(orders: Order[], pizzas: Pizza[]): string {

    const pizzaSales = orders
        .flatMap(order => order.items)
        .reduce((acc, item) => {
            acc[item.pizzaId] = (acc[item.pizzaId] || 0) + item.quantity;
            return acc;
        }, {} as { [key: string]: number });

    const maxSales = Math.max(...Object.values(pizzaSales));

    const mostSoldPizzaIds = Object.keys(pizzaSales)
        .filter(pizzaId => pizzaSales[pizzaId] === maxSales);

    const mostSoldPizzas = mostSoldPizzaIds
        .map(pizzaId => pizzas.find(pizza => pizza.id === pizzaId)?.name)
        .filter(Boolean);

    return mostSoldPizzas.length > 0
        ? `Les pizzas les plus vendues sont : ${mostSoldPizzas.join(', ')} avec ${maxSales} ventes.`
        : "Aucune pizza trouvée.";
}

console.log(calculatePizzaPriceAverage(pizzas))
console.log(findMostOrderedPizza(orders));
console.log(`Nombre de bases de pizzas différentes : ${countUniqueBases(pizzas)}`);
console.log(`Nombre de pizzas à base de tomate : ${countTomatoBasePizzas(pizzas)}`);
console.log(`Il y a  ${countDifferentIngredients(pizzas)} ingrédients différents`);
console.log(`L'ingrédient ${findIngredientAlone(pizzas)} est présent dans une seul recette`);
console.log(`Il y a  ${findLessThan4(pizzas)} avec moins de 4 ingrédients`);
// Order
console.log(`les recettes qui n'ont jamais était vendue sont : ${findDontSellPizza(pizzas, orders)}`);
console.log(`Le montant moyen des commandes est ${averageOrder(orders)}`)
console.log(`Le prix moyen des pizzas à base de tomate est : ${averageTomatePizza(orders, pizzas)}`);
console.log(mostSoldPizzas(orders, pizzas));