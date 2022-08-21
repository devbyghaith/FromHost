const TableManager = require("../../../database/table-manager");

const express = require('express');

const activationsTable = new TableManager("activations");
const productsTable = new TableManager("products");

const router = express.Router();

router.get("/:product", async (request, response) => {
    try {
        let productName = request.params.product;

        if (productName?.length) {
            let doesProductExist = await productsTable.doesRowExist({ name: productName });

            if (doesProductExist) {
                let product = await productsTable.fetchRow({ name: productName });
                let isActivated = await activationsTable.doesRowExist({ product: product.id, address: response.locals.requestAddress });

                return response.status(200).send(isActivated ? ("Activated") : ("Not activated"));
            } else return response.status(400).send(`"${productName}" is not a valid product name`);
        } else return response.status(400).send("No product name specified");
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    };
});

module.exports = router;