require('dotenv').config();
const path = require('path');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");

const app = express();


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// database
const db = require("./app/models");
const Op = db.Sequelize.Op;
const Role = db.role;
const User = db.user;
// const Region = db.regions;


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



async function initial() {
  Role.create({
    id: 1,
    name: "super"
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

// simple route
// app.get("/", (req, res) => {
     // console.log(__dirname)

//   res.json({ message: "Welcome To All-in Paking Application." });
// });

// routes
// require('./app/routes/auth.routes')(app);
require('./app/routes/sms.routes')(app);

// if(process.env.NODE_ENV === 'production' || true){
//   app.get('/*', (req, res) => {
//     console.log(__dirname)
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });
// }

var http = require('http');

var port = normalizePort(process.env.PORT || '23001');
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