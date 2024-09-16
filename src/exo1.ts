import {Stock} from "./stock.ts";
import {Fruit} from "./fruit.ts";

let stocks = new Stock();

// UC01
stocks.addFruit(new Fruit('banane', 5))
stocks.listFruits()

// UC02
let banane = stocks.getFruitByName('banane');
if (banane) {
    stocks.sellFruit(banane.id, 2);
    stocks.listFruits()
}
// UC03
stocks.addFruit(new Fruit('mirabelle', 20))
stocks.listFruits();

// UC04
let mirabelle = stocks.getFruitByName('mirabelle');
if (mirabelle) {
    stocks.updateStock(mirabelle.id, 10);
    stocks.listFruits()
}

// UC05
mirabelle = stocks.getFruitByName('mirabelle');
if (mirabelle) {
    stocks.removeFruit(mirabelle.id);
    stocks.listFruits()
}

// UC06
stocks.checkFruit('banane', 1);
stocks.checkFruit('banane', 30);
stocks.checkFruit('mirabelle', 30);

// Scénario de test
stocks = new Stock();
let pommes = new Fruit("pommes", 10)
let poires = new Fruit("poires", 5)
let ananas = new Fruit("ananas", 8)

stocks.addFruit(pommes)
stocks.addFruit(poires)
stocks.addFruit(ananas)

stocks.updateStock(pommes.id, 5)
stocks.updateStock(poires.id, 8)
stocks.sellFruit(ananas.id, 2)

stocks.listFruits()
stocks.removeFruit(ananas.id)
stocks.listFruits()