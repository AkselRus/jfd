const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const productPath = path.join(__dirname, "mock", "products.json");

async function addProduct(data) {
    const products = await getProducts();
    products.push(data);

    await saveNotes(products);
    console.log(chalk.bgGreen("Product was added!"));
}

async function getProducts() {
    const products = await fs.readFile(productPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(products)) ? JSON.parse(products) : [];
}

async function saveNotes(products) {
    await fs.writeFile(productPath, JSON.stringify(products));
    console.log(chalk.green("Save"));
}

async function removeProduct(id) {
    console.log(id);
    const products = await getProducts();
    const newProd = products.filter(function (product) {
        return product._id !== id;
    });

    if (products.length > newProd.length) {
        console.log(chalk.green.inverse("Product removed"));
        saveNotes(newProd);
    } else {
        console.log(chalk.red.inverse("No product found"));
    }
}
async function updateProduct(data) {
    console.log("data", data);
    if (data) {
        const products = await getProducts();
        const newProd = products.filter((p) => p._id !== data._id);
        newProd.push(data);
        saveNotes(newProd);
        console.log(chalk.green("Update Complite"));
    } else console.log(chalk.red("Error update"));
}

module.exports = {
    addProduct,
    getProducts,
    removeProduct,
    updateProduct,
    saveNotes,
};
