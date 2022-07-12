module.exports = {
    client: {
        id: "904371174610436146",
        secret: "YOUR_DISCORD_CLIENT_SECRET",
        token: "YOUR_DISCORD_BOT_TOKEN",
    },

    oauth: {
        callbackURL: "http://localhost/auth/callback",
        scopes: ["identify"]
    }
};