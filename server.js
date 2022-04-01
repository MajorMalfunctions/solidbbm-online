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
const Option = db.options;

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
//   initial();
});



db1.sequelize.sync(
  // {force: true}
  ).then(() => { 
//   initial1();
});


const { user, roles, options, smsApi } = require('./data').defData;

async function initial() {
  
  options.map(a => {
    Option.create(a)
  })


  roles.map(a => {
    Role.create(a);
  })

  User.create(user).then(usr => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: ["super"]
          }
        }
      }).then(rls => {
        usr.setRoles(rls).then(() => {
          console.log({ message: "User was registered successfully!" });
        })
        .catch(err => {
          console.log(err)
        });
      })
      .catch(err => {
        console.log(err)
      })
  })
  .catch(err => {
    console.log({ message: err.message });
  });
}

async function initial1() {
  // initial();
 
  Role1.create(roles[0]);
  smsApi.forEach(a => {
    SmsApp.create(a)
  })


  User1.create(user).then(usr => {
      Role1.findAll({
        where: {
          name: {
            [Op.or]: ["super"]
          }
        }
      }).then(rls => {
        usr.setRoles(rls).then(() => {
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
