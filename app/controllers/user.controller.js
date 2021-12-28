const db = require("../models");
const Barangay = db.barangays;
const Citymun = db.cityMuns;
 

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
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


exports.findBrgyByCitymunCode = (req, res) => {
  let { citymunCode } = req.params

  Barangay.findAll({where: { citymunCode }})
    .then((barangays) => {
      res.status(200).json({length: barangays.length, data: barangays});
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};