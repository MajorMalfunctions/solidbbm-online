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
const Users = db.user;



exports.getAllSupporters =  (req, res) => {
let obj = {};
  supporter.findAll({ include: [{
    model: location,
    required: false
}, {model: regions, as: "RegionSupport", required: false}] })
  .then((doc) => {
    obj.total = doc.length;
    obj.verified = doc.filter(a => a.isVerified).length;
    obj.totalSupData = doc;
    obj.totalVerData = doc.filter(a => a.isVerified);
 console.log(obj)
    return res.status(200).json(obj);
  })
  .catch((err) => {
    console.log(">>Error While Fetching Supporters! ", err);
   return res.status(400).send({ error: err, message: 'Error While Fetching Supporters!'});
  });

};

exports.getAllSupportersCount =  (req, res) => {
  let obj = {};
    supporter.findAll({ include: [{
      model: location,
      required: false
  }] })
    .then((doc) => {
      return res.status(200).json(doc.length);
    })
    .catch((err) => {
      console.log(">>Error While Fetching Supporters! ", err);
     return res.status(400).send({ error: err, message: 'Error While Fetching Supporters!'});
    });
  
  };


  exports.getOrganization = (req, res) => {

    Users.findAll()
    .then(rs => {
      res.status(200).json(rs);
    })
    .catch(err => {
      res.status(400).json(err)
    })
  };


exports.createOption = (req, res) => {
  res.status(200).send("User Content.");
};

exports.getRegionProvinces = async (req, res) => {

  try {
    let pr = await provinces.findAll({ include: ["region_provinces"] })
     regions.findAll({include: ["region_provinces"]})
     .then(rs => {
     return res.status(200).json({pr, rs})
     })
     .catch(err => {
        res.status(400).json(err)
     })
    

  } catch(err) {
    console.log(err)
   res.status(400).json(err)
  }

};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
