const isAuthenticated = require('../../../middlewares/isAuthenticated');

const express = require('express');

const router = express.Router();

router.use(isAuthenticated);
router.get('/', (request, response) => {
    return response.status(200).json({
        status: 'OK',
        data: request.user
    });
});

module.exports = router;