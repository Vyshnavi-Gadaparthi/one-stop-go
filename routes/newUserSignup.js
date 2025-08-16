var express = require('express');
var router = express.Router();
var dbUtil = require("./common/dbUtil");
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.post('/', function(req, res, next) {
    var userInput = req.body;
    console.log(userInput);
    bcrypt.hash(userInput.password, saltRounds, function(err, hash) {
        userInput.password = hash;
        dbUtil.getMongodbConnection(userInput, 'newSignup').then(() => {
            res.send(JSON.stringify({'msg': 'Signedup Successfuly'}));
        }).catch(() => {
            res.send(JSON.stringify({'msg': 'Error'}));
        });
    });
});

module.exports = router;
