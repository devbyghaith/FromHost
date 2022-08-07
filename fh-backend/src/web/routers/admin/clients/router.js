const TableManager = require("../../../../database/table-manager");

const isAdministrator = require("../../../middlewares/isAdministrator");
const isAuthenticated = require("../../../middlewares/isAuthenticated");

const express = require('express');

const activationsTable = new TableManager("activations");
const usersTable = new TableManager("users");

const router = express.Router();

router.use(isAuthenticated, isAdministrator);
router.get("/", async (request, response) => {
    try {
        let activations = await activationsTable.fetchRows();
        let clients = activations?.length ? await usersTable.fetchRows({ id: activations.map((activation) => activation.user.id) }) : [];

        return response.status(200).json({
            status: "OK",
            data: clients.map((client) => ({ ...client, totalActivations: activations.filter((activation) => activation.user.id === client.id).length }))
        })
    } catch (error) {
        console.log(error)
    };
});

module.exports = router;