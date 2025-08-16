var express = require('express');
var router = express.Router();
const multer  = require('multer');
var path = require('path');
var filename = '';
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/products');
    },
    filename: (req, file, callback) => {
        console.log(file)
        filename  = "prodImage-" + Date.now() + path.extname(file.originalname);
        callback(null, filename); // You can customize the filename as needed
    }
});

var uploadResource = multer({ storage: storage}).single('prodThumbnail');

/* GET home page. */
router.post('/', function(req, res, next) {
   var responseObj = {};
    uploadResource(req, res, function(err) {
        if (err) {
            responseObj.msg = 'Error uploading file: ' + err.message;          
            return res.status(500).send(JSON.stringify(responseObj));
        } else {

            responseObj.filePath = '/images/products/' + filename;
            responseObj.msg = 'Successfully uploaded resource';
            res.status(200).send(JSON.stringify(responseObj));
        }        
    });
});

module.exports = router;


// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It makes it easy to handle file uploads in Node.js applications.