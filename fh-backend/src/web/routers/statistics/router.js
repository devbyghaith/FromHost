const TableManager = require("../../../database/table-manager");

// const getDaysArray = require("../../../utilities/functions/getDaysArray");

const express = require('express');

const activationsTable = new TableManager("activations");
const statisticsTable = new TableManager("statistics");
const productsTable = new TableManager("products");
const usersTable = new TableManager("users");

const router = express.Router();

// router.get('/', async (request, response) => {
//     try {
//         var dayBeforeTwoWeeks = new Date().setDate(new Date().getDate() - 14);
//         var lastTwoWeeks = getDaysArray(dayBeforeTwoWeeks, new Date());

//         var weeksStatistics = await statisticsTable.fetchRows({ date: lastTwoWeeks.map((date) => date.toISOString().split("T").shift()) });

//         return response.status(200).json({
//             status: "OK",
//             data: weeksStatistics,
//         });
//     } catch (error) {
//         return response.status(500).json({
//             status: "Internal Server Error"
//         });
//     };
// });

router.get('/', async (request, response) => {
    try {
        var totalActivations = await activationsTable.totalRows();
        var totalProducts = await productsTable.totalRows();
        var totalUsers = await usersTable.totalRows();

        return response.status(200).json({
            status: "OK",
            data: {
                activations: totalActivations,
                products: totalProducts,
                users: totalUsers,
            },
        });
    } catch (error) {
        return response.status(500).json({
            status: "Internal Server Error"
        });
    };
});

module.exports = router;