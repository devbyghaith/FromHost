const TableManager = require("../../../../database/table-manager");

const isAdministrator = require("../../../middlewares/isAdministrator");
const isAuthenticated = require("../../../middlewares/isAuthenticated");

const express = require('express');

const productsTable = new TableManager("products");

const router = express.Router();

router.use(isAuthenticated, isAdministrator);
router.get("/", async (request, response) => {
    try {
        let products = await productsTable.fetchRows();

        return response.status(200).json({
            status: "OK",
            data: products
        });
    } catch (error) {
        console.error(error);
    };
});

router.post("/", async (request, response) => {
    try {
        let productName = request.body.product;

        if (productName?.length) {
            let doesProductExist = await productsTable.doesRowExist({ name: productName });

            if (doesProductExist) {
                return response.status(400).json({
                    status: "Bad Request",
                    error: true,
                });
            } else {
                await productsTable.insertRow({ name: productName });

                let allProducts = await productsTable.fetchRows();

                return response.status(200).json({
                    status: "OK",
                    data: allProducts
                });
            };
        } else return response.status(400).json({
            status: "Bad Request",
            error: true,
        });
    } catch (error) {
        console.error(error);
        
    };
});

router.delete("/", async (request, response) => {
    try {
        let productId = request.body.product;

        if (productId && !isNaN(productId)) {
            let doesProductExist = await productsTable.doesRowExist({ id: productId });

            if (doesProductExist) {
                await productsTable.deleteRow({ id: productId });

                let leftProducts = await productsTable.fetchRows();

                return response.status(200).json({
                    status: "OK",
                    data: leftProducts,
                });
            } else return response.status(400).json({
                status: "Bad Request",
                error: true,
            });
        } else return response.status(400).json({
            status: "Bad Request",
            error: true,
        });
    } catch (error) {
        
    };
});

module.exports = router;