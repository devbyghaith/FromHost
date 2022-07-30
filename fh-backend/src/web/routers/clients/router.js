const TableManager = require("../../../database/table-manager");

const isAuthenticated = require("../../middlewares/isAuthenticated");

const express = require('express');

const activationsTable = new TableManager("activations");
const usersTable = new TableManager("users");

const router = express.Router();

router.use(isAuthenticated);
router.get("/my-products", async (request, response) => {
    try {
        let myProducts = await activationsTable.fetchRows({ user: request.user.id });

        return response.status(200).json({
            status: "OK",
            data: myProducts,
        });
    } catch (error) {
        
    };
});

router.post("/my-products", async (request, response) => {
    try {
        console.log(request.body.activation, request.body.address);
        if (request.body.activation && request.body.address) {
            let doesActivationExist = await activationsTable.doesRowExist({ id: request.body.activation, user: request.user.id });

            if (doesActivationExist) {
                await activationsTable.updateRow({ id: request.body.activation }, { id: request.body.activation, user: request.user.id, address: request.body.address });

                let myNewProducts = await activationsTable.fetchRows({ user: request.user.id });

                return response.status(200).json({ 
                    status: "OK",
                    data: myNewProducts,
                });
            } else {
                console.log("NO ACTIVATION")
            };
        } else {
            console.log("MISSING KEYS")
        };
    } catch (error) {
        console.log(error);
    };
});

module.exports = router;