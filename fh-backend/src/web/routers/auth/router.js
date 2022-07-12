const passport = require('passport');
const express = require('express');

const router = express.Router();

router.get('/', passport.authenticate("discord"));
router.get('/callback', passport.authenticate("discord", { failureRedirect: "/oauth" }), async (request, response) => {
    return response.send(`<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> </head> <body></body> <script type="text/javascript">let currentWindow=window; let closeFunction=currentWindow.close; if (closeFunction && typeof closeFunction=="function") closeFunction(); else console.error("Unable to close the window"); </script></html>`);
});

module.exports = router;