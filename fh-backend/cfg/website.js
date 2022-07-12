module.exports = {
    host: "0.0.0.0",
    port: "80",

    settings: {
        trustProxy: true,

        session: {
            saveUninitialized: false,
            secret: "YOUR_SESSION_SECRET",
            resave: false
        },

        cors: {
            credentials: true,
            origin: "http://localhost:3000"
        }
    },
};