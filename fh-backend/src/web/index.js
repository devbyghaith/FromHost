const websiteConfig = require('../../cfg/website');

const passportInitializer = require('../utilities/passport-initializer');

const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

passportInitializer(passport);

class Website {
    constructor() {
        this.app = express();

        this.app.set("trust proxy", websiteConfig.settings.trustProxy);

        this.app.use(express.static(path.join(__dirname, '..', '..', 'files')));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(expressSession(websiteConfig.settings.session))
        this.app.use(cors(websiteConfig.settings.cors));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use((request, response, next) => {
            response.locals.requestAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
            response.locals.requestFullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;

            next();
        });

        this.app.listen(websiteConfig.port, websiteConfig.host, () => {
            console.log(("WEBSITE"), (`Listening to requests on <http://localhost:${websiteConfig.port}/>`));
        });
    };

    registerRouters(directoryPath, currentURL) {
        if (!directoryPath?.length) directoryPath = path.join(__dirname, "routers");
        if (!currentURL?.length) currentURL = ("/");

        if (fs.existsSync(directoryPath)) {
            fs.readdirSync(directoryPath)
            .forEach((directoryFile) => {
                let filePath = path.join(directoryPath, directoryFile);
                let fileStat = fs.lstatSync(filePath);
                
                if (fileStat.isDirectory()) this.registerRouters(filePath, (currentURL + directoryFile + "/"));
                else {
                    try {
                        this.app.use(currentURL, require(filePath));
                    } catch (error) {
                        console.log(("ROUTERS"), (`${currentURL}${directoryFile}`), error.message ? error.message : error);
                    };
                };
            });
        } else console.log(("HANDLER"), ("ROUTERS"), (`<${directoryPath}> does not exist`));
    };
};

module.exports = Website;