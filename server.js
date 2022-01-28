require('dotenv').config();
const path = require('path');
const express = require("express");
const express1 = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");

const app = express();
const app1 = express1();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app1.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
app1.use(express1.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app1.use(express1.urlencoded({ extended: false }));


// database
const db = require("./app/models");
const Op = db.Sequelize.Op;
const Role = db.role;
const User = db.user;
const Region = db.regions;


//database2
const db1 = require("./app1/models");
const Role1 = db1.role;
const User1 = db1.user;
const SmsApp = db1.app;



app.use(express.static(path.join(__dirname+'/client/', 'build')));


// db.sequelize.sync().then(() => {
//       // initial()
// }).catch(err => {
//   console.log(err)
// });
db.sequelize.sync(
  // {force: true}
  ).then(() => { 
  // initial();
});



db1.sequelize.sync(
  // {force: true}
  ).then(() => { 
  // initial1();
});


async function initial() {
  Role.create({
    id: 1,
    name: "super"
  });
  Role.create({
    id: 2,
    name: "admin"
  });
  Role.create({
    id: 3,
    name: "user"
  });
  Role.create({
    id: 4,
    name: "region"
  });
  Role.create({
    id: 5,
    name: "province"
  });
  Role.create({
    id: 6,
    name: "citymun"
  });
  Role.create({
    id: 7,
    name: "barangay"
  });


  User.create({
    "username": "jaybee420",
    "firstName": "jaybee",
    "lastName": "Pido",
    "middleName": "Bermoy",
    "mobile": "12312312",
    "password": bcrypt.hashSync("123123", 8),
    "isVerified": true
  }).then(user => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: ["super"]
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          console.log({ message: "User was registered successfully!" });
        });
      });
  })
  .catch(err => {
    console.log({ message: err.message });
  });
}

async function initial1() {
  Role1.create({
    id: 1,
    name: "super"
  });

  SmsApp.create({
    id: 1,
    appkey: "kA8aH5keEgCMLTKkRbieqkCGeAroH5KL",
    appsecret: "9bfe8c50e830427ba3ccc9292320fe95a29cf96f3ce54b18eb56b3fcfb2a6a87",
    short: "6583",
    code: "21586583",
  });

  SmsApp.create({
    id: 2,
    appkey: "b7jeCej97jF5bTbb6Ei9yAFzM7AaCrE8",
    appsecret: "0bf8b15ba57bc326790ccc04c438bb51903564bbf9ce8e02fea6a466733601ce",
    short: "9022",
    code: "21589022",
  });






  User1.create({
    "username": "jaybee420",
    "firstName": "jaybee",
    "lastName": "Pido",
    "middleName": "Bermoy",
    "mobile": "12312312",
    "password": bcrypt.hashSync("123123", 8),
    "isVerified": true
  }).then(user => {
      Role1.findAll({
        where: {
          name: {
            [Op.or]: ["super"]
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          console.log({ message: "User was registered successfully!" });
        });
      });
  })
  .catch(err => {
    console.log({ message: err.message });
  });
}


// simple route
// app.get("/", (req, res) => {
     // console.log(__dirname)

//   res.json({ message: "Welcome To All-in Paking Application." });
// });

// routes
// require('./app/routes/auth.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


// routes SMS
// require('./app/routes/auth.routes')(app);
require('./app1/routes/sms.routes')(app);
require('./app1/routes/auth.routes')(app);



if(process.env.NODE_ENV === 'production' || true){
  app.get('/*', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
}

var http = require('http');

var port = normalizePort(process.env.PORT || '23000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);

// set port, listen for requests
// const PORT = process.env.PORT || 23000;
// console.log(PORT)

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

function normalizePort(val) {
  var port = parseInt(val, 10);
  console.log(port)
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}