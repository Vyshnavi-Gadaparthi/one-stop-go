var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("================Logout Session Serving from ============================" + process.pid);
    req.session.destroy();
    res.send(JSON.stringify({
        status: 'success',
        message: 'Current User logged got loggedout successfully'
    }));
});

module.exports = router;
