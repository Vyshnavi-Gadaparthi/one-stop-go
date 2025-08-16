var router = require("express").Router();
var dbUtil = require("./common/dbUtil");
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    var userInput = req.query;
    console.log("======================Get Product Details is serving from ================" + process.pid);
    var userPassedJwtToken = req.headers['authorization'] ? req.headers['authorization'] : '';
    userPassedJwtToken = userPassedJwtToken.replace('Bearer ', '');
    jwt.verify(userPassedJwtToken, process.env.JWT_SECRET, (err, data) => {
        if (data) {
            dbUtil.getMongodbConnection(userInput, 'findProduct').then((dbResponse) => {
                res.send(JSON.stringify(dbResponse));
            }).catch(() => {
                res.send(JSON.stringify({status: 'error', message: 'Error while fetching product details'}));
            });
        } else {
            res.status(401).send(JSON.stringify({status: 'error', message: 'Unauthorized access'}));
        }
    });
    
});

module.exports = router;