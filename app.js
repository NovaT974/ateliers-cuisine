var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/cuisine',{ useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var db = mongoose.connection;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
  mongooseConnection: db
  })
}));

//routes Ateliers
var ateliers = require("./routes/ateliers");
app.use("/ateliers", ateliers);

// routes profiles cuisinier
var cuisiniersSession = require("./routes/cuisiniersSession");
app.use("/cuisiniersSession", cuisiniersSession);

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

// fonction pour l'ajout image
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,__dirname + "/public/img/")
  },
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});

// Init Upload
var upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image2');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  var filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  var mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

app.post('/public/img', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

module.exports = app;
