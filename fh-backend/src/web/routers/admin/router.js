const TableManager = require("../../../database/table-manager");

const isAdministrator = require("../../middlewares/isAdministrator");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const express = require('express');

const activationsTable = new TableManager("activations");
const productsTable = new TableManager("products");
const usersTable = new TableManager("users");

const router = express.Router();

router.use(isAuthenticated, isAdministrator);

module.exports = router;