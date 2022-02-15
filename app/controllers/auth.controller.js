const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Supporters = db.supporter;
const Roles = db.role;
const Medias = db.media
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { validateLoginData } = require('../utils/validators')
const { validateSignupData } = require('../utils/validators')


exports.signup = (req, res) => {
  // Save User to Database
  console.log(req.body)
  
  const { valid, errors } = validateSignupData(req.body);
  console.log(errors)
  if (!valid) return res.status(400).json(errors);
  let { email, password, username, areaCode, supporterId, roles } = req.body;

  User.create({
    areaCode, supporterId,
    email, username,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
      

      if (roles) {
        Role.findOne({
          where: {
            name: roles
            }
        }).then(role => {
          console.log(role)
          user.setRoles([role]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([3]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const { valid, errors } = validateLoginData(req.body);
  console.log(errors)
  if (!valid) return res.status(400).json({ errors, message: { text: 'Something went wrong!', type: 'error'}});


  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) { 
        return res.status(404).send({ message: { text: "User Not found.", type: "error"} });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: { text: "Invalid Password!", type: "error"}
        });
      }

  

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }


        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          isVerified: user.isVerified,
          accessToken: token
        });
      });
    })
    .catch(err => {
    return  res.status(500).send({ message: err.message });
    });
};


exports.getAuthUser = (req, res) => {
    User.findByPk(req.userId, { 
      include: [{ model: Supporters, required: false},{ model: Roles},
        // {model: Medias, as: 'UserProfile', require: false}
      ],
      attributes: {exclude: ['password']},
     })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({  message: { text: 'Something went wrong!', type: 'error'}});
    })
};