var express = require('express');
var router = express.Router();
var dbUtil = require("./common/dbUtil");

/* GET home page. */
router.post('/', function(req, res, next) {
    var productData = req.body;
    var responseObj = {};
    dbUtil.getMongodbConnection(productData, 'addProduct').then(() => {
        responseObj.msg = 'Success';
        res.send(JSON.stringify(responseObj));
    }).catch(() => {
        responseObj.msg = 'Error while upload';
    })
});

module.exports = router;
