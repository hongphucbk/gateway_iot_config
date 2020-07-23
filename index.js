require('dotenv').config();
require('express-group-routes');
const normalizePort = require('normalize-port');

var bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = normalizePort(process.env.PORT || 3100);

//app.set('port', process.env.PORT || 3000);

var http = require('http').createServer(app);

app.use((req, res, next) => {
  res.locals.user = "";
  next()
})


//==================

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const cookieParser = require('cookie-parser')
app.use(cookieParser()) // use to read format cookie

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static('public'));  
//app.use(express.static(path.join(__dirname, 'public'))); 
app.set('views', './views');



// Khai báo Router --------------------------------------------------
var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');

var homeRouter = require('./routes/home/index.route');

//var developerIntroRouter = require('./routes/developer/introduce.route');
//var developerTempHumRouter = require('./routes/developer/temphum.route');

//-------------------------------------------------------------------

var mongoose = require('mongoose');
//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true});
//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});


var middleware = require('./middlewares/auth.middleware');

// app.get('/', function(req, res) {
// 	res.render('real/list2');
// }) 

// Router -----------------------------------------------------------
app.use('/users', userRouter);
//app.use('/auth', authRouter);
//app.use('/email', emailRouter);

app.use('/', homeRouter);
app.use('/home', homeRouter);
//app.use('/power', powerRouter);
//app.use('/demo', demoRouter);
//app.use('/inverter', inverterRouter);
//app.use('/flexy', flexyRouter);


// app.group("/developer", (router) => {
//   router.use('/introduce', developerIntroRouter);
//   router.use('/temp-hum', developerTempHumRouter);
//   // router.use('/datainfor', datainforRouter);
//   // router.use('/parameter', parameterRouter);
//   // router.use('/station-para', stationParaRouter);
//   //router.get("/users", loginController.store); // /api/v1/login 
// });

//-------------------------------------------------------------------



app.listen(port, function(){
	console.log(`Server listening on port ${port}!`)
});


// let strPath = "database\\gatewaydata.db"

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(strPath);

// db.serialize(function() {
//   //db.run("CREATE TABLE config (id int primary key not null,name text not null,value text)");

//   //db.run("INSERT INTO config (id, name,value) VALUES (112, 'site1', 'KCC1')");
  

//   db.each("SELECT * FROM config", function(err, row) {
//   	console.log(row)
//       console.log(row.id + ": " + row.name + ' ' + row.value);
//   });
// }); 
  
//db.close();
