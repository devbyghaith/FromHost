const TableManager = require("../../../../database/table-manager");

const isAdministrator = require("../../../middlewares/isAdministrator");
const isAuthenticated = require("../../../middlewares/isAuthenticated");

const express = require('express');

const activationsTable = new TableManager("activations");
const productsTable = new TableManager("products");
const usersTable = new TableManager("users");

const router = express.Router();

router.use(isAuthenticated, isAdministrator);
router.get("/", async (request, response) => {
    try {
        let activations = await activationsTable.fetchRows();

        return response.status(200).json({
            status: "OK",
            data: activations
        });
    } catch (error) {
        
    };
});

router.post("/", async (request, response) => {
    try {
        let { user, address, product } = request.body;

        if (user?.length && address?.length && (product && !isNaN(product))) {
            let doesProductExist = await productsTable.doesRowExist({ id: product });

            if (doesProductExist) {
                let userData = await usersTable.fetchRow({ user });
                
                await activationsTable.insertRow({ user: userData.id, product, address });
                
                let allActivations = await activationsTable.fetchRows();

                return response.status(200).json({
                    status: "OK",
                    data: allActivations,
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

router.delete("/", async (request, response) => {
    try {
        let activationId = request.body.activation;

        if (activationId) {
            await activationsTable.deleteRow({ id: activationId });

            let activations = await activationsTable.fetchRows();

            return response.status(200).json({
                status: "OK",
                data: activations,
            });
        } else return response.status(400).json({
            status: "Bad Request",
            error: true,
        });
    } catch (error) {
        
    };
});

module.exports = router;