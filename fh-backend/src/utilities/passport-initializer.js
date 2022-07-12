const discordConfig = require("../../cfg/discord");

const TableManager = require("../database/table-manager");

const passportDiscord = require("passport-discord");

const profilesTable = new TableManager("profiles");
const usersTable = new TableManager("users");

module.exports = (passport) => {
    passport.use(new passportDiscord.Strategy({
        clientID: discordConfig.client.id,
        clientSecret: discordConfig.client.secret,
        callbackURL: discordConfig.oauth.callbackURL,
        scope: discordConfig.oauth.scopes,
    }, async (accessToken, refreshToken, discordProfile, done) => {
        try {
            let user = await usersTable.fetchRow({ user: discordProfile.id });

            await profilesTable.updateRow({ user: user.id }, { user: user.id, profile: JSON.stringify(discordProfile) });

            done(null, { ...user, profile: discordProfile });
        } catch (error) {
            done(error, null);
        };
    }));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            let doesUserExist = await usersTable.doesRowExist({ id: id });

            if (doesUserExist) {
                let user = await usersTable.fetchRow({ id: id });
                let userProfile = await profilesTable.fetchRow({ user: user.id });

                done(null, { ...user, profile: typeof userProfile === "string" ? JSON.parse(userProfile.profile) : userProfile.profile });
            } else return done(null, null);
        } catch (error) {
            done(error, null);
        };
    });
};