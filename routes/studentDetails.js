var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {


    var studentData  = {
        name: 'Raj',
        age: 20,
        gender: 'Male',
        location: 'Hyderabad'
    }
    res.send(JSON.stringify(studentData));
    // res.render('studentDetails', studentData);
});

module.exports = router;

