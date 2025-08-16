var express = require('express');
var router = express.Router();
var dbUtils = require('./common/dbUtil');
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var sendMailContent = require('./common/sendMail');

router.post('/', (req, res) => {
    console.log("============================Validate user Credentials serving from ==========================" + process.pid);
    var userInput = req.body;
    var resObj = {};
    try {
        dbUtils.getMongodbConnection(userInput, 'find').then((dbResponse) => {
            if (dbResponse.length) {
                bcrypt.compare(userInput.password, dbResponse[0].password, function(err, result) {
                    if (result) {
                        resObj.status = 'Valid';
                        var jwtToken = jwt.sign(userInput, process.env.JWT_SECRET, { expiresIn: '1m' });
                        resObj.jwtToken = jwtToken; // send JWT token to client
                        req.session.isUserLoggedIn = true; // set session variable
                        req.session.accountId = dbResponse[0].accountId; // store user name in
                        sendMailContent();
                    } else {
                        resObj.status = 'Invalid';
                    }
                    res.send(JSON.stringify(resObj));
                });   
            } else {
                resObj.status = 'Invalid';
                res.send(JSON.stringify(resObj));
            }
        }).catch(() => {
            console.log("Exceptopn");
        });   
    } catch(error) {
        console.log("error");
        console.log(error);
    }
});



module.exports = router;