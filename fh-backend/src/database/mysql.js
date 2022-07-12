const mysqlConfig = require('../../cfg/database');

const mysql2 = require('mysql2');

const mysqlConnection = mysql2.createConnection({
    database: mysqlConfig.data,
    host    : mysqlConfig.host,
    port    : mysqlConfig.port,
    user    : mysqlConfig.user,
    password: mysqlConfig.pass,
});

mysqlConnection.connect((error) => {
    if (error) {
        console.log("MYSQLDB", "Unable to connect with the MySQL server");
        console.log("MYSQLDB", error?.message ? error.message : error);
    } else {
        console.log("MYSQLDB", "Database connection established");
    };
});

module.exports = mysqlConnection;