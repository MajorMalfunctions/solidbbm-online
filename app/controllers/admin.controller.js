const config = require('../config/auth.config')
const db = require("../models");
const axios = require('axios');
const { formatted_address } = require('../utils/formatter');
const Barangay = db.barangays;
const Citymun = db.cityMun;
const provinces = db.provinces;
const regions = db.regions;
const supporter = db.supporter;
const location = db.location;



exports.getAllSupporters =  (req, res) => {
let obj = {};
  supporter.findAll({ include: [{
    model: location,
    required: false
}] })
  .then((doc) => {
    obj.total = doc.length;
    obj.verified = doc.filter(a => a.isVerified).length;
    obj.totalSupData = doc;
    obj.totalVerData = doc.filter(a => a.isVerified);
 
    return res.status(200).json(obj);
  })
  .catch((err) => {
    console.log(">>Error While Fetching Supporters! ", err);
   return res.status(400).send({ error: err, message: 'Error While Fetching Supporters!'});
  });

};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
