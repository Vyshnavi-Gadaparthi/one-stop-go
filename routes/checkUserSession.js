var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("===========================Check User Session is serving from ===========================" + process.pid);
    res.send(JSON.stringify({isUserLoggedIn: req.session.isUserLoggedIn, accountId: req.session.accountId}));
});

module.exports = router;
