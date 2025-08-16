var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require("dotenv").config(); // env should be available through out application
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateRouter = require("./routes/validateCredentials")
var productRouter = require("./routes/getProductDetails");
var newUserSignupRouter = require("./routes/newUserSignup");
var addNewProduct = require('./routes/addNewProduct');
var uploadResourceRouter = require('./routes/uploadResource');
var checkUSerSessionRouter = require('./routes/checkUserSession');
var logoutSessionRouter = require('./routes/logoutSession');
var studentDataRouter = require("./routes/studentDetails");
const noOfCulsterCopies = require('os').availableParallelism();
var cluster = require('cluster');
var http = require("http");
const { Server } = require("socket.io");
var app = express();
var server = http.createServer(app);
if (cluster.isPrimary) {
     for(var i = 1; i <= noOfCulsterCopies; i++) {
          cluster.fork();
     }
     cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} Died`);
     });
} else {
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is listing at ${process.env.SERVER_PORT} and process id is ${process.pid}`);
    });
  }

// Socket.io setup
// This will allow the server to listen for WebSocket connections
// and handle real-time communication with clients.
// Make sure to install socket.io using npm install socket.io

const io = new Server(server);
var totalConnections = 0;
io.on('connection', (socket) => {  
  totalConnections++;
  socket.on("disconnect", () => {
    totalConnections--;
    console.log('a user got disconnected , current count ' + totalConnections );
  });
  socket.on("user_send_msg", (msg) => {
    console.log("message received from user: " + msg);
    // Here you can handle the message, e.g., save it to a database or broadcast it to other users
    // For now, we will just echo it back to the user
    //socket.emit("receive_msg", msg); // Echo the message back to the user
    socket.broadcast.emit("receive_msg", msg); // Broadcast the message to all other connected users
  });
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  // resave: false,
  saveUninitialized: true,
  cookie: { maxAge : 100000 } // session will expire after 10 seconds
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/userCredentials', validateRouter);
app.use("/get/details/product", productRouter);
app.use("/new/User/signup", newUserSignupRouter);
app.use("/add/newProduct", addNewProduct);
app.use('/upload/resource', uploadResourceRouter);
app.use('/check/userSession', checkUSerSessionRouter);
app.use('/logout/session', logoutSessionRouter);
app.use('/get/studentDetails', studentDataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
