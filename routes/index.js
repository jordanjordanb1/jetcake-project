const express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html'); // Loads react application
});

module.exports = router;
