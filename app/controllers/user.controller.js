const config = require('../config/auth.config')
const db = require("../models");
const axios = require('axios');


const Barangay = db.barangays;
const Citymun = db.cityMun;
const Provinces = db.provinces;
const Regions = db.Regions;
const Supporters = db.supporter;
const location = db.location;
const Op = db.Sequelize.Op;



const { validateSupporterDetails, validateMapDetails } = require('../utils/validators')
const { formatted_address } = require('../utils/formatter');
const { countAge, toUpperCase } = require('../utils/helpers');


exports.createSupporterDetails = async (req, res) => {
  delete req.body.id 
  console.log(req.body)
  const { valid, errors } = validateSupporterDetails(req.body);
  if (!valid) return res.status(400).json(errors);
  

  let { firstName, lastName, birthDate, contact, psgcCode, middleName } = toUpperCase(req.body);
  let age = countAge(birthDate);
  console.log(firstName)
 await Supporters.findOne({
    where: {
      [Op.and]: [
        { firstName },
        { lastName }, 
        { age }
      ]
    }
  })
 .then((doc) => {
    console.log(doc)
    console.log(!doc)
    if(!doc){
     return Supporters.create({
        firstName, lastName, birthDate, contact, psgcCode, middleName, age
      })
      .then(sup => {
        return res.status(200).json(sup);
      })
      .catch((err) => {
        console.log(">>Error While Saving Supporter! ", err);
        return res.status(400).send({ error: err, message: 'Error While Saving Supporter!'});
      });
    } else {
       res.status(400).send('Already exist on Master List');
    }
  })
  .catch((err) => {
    console.log(">>Error While Saving Supporter! ", err);
    return res.status(400).send({ error: err, message: 'Error While Saving Supporter!'});
  });
};

exports.pinSupporterLocation = async (req, res) => {
  const { lat, lng, id } = req.params;
  const { valid, errors } = validateMapDetails({lat,lng,id});
  if (!valid) return res.status(400).json(errors);




  let sup = await Supporters.findByPk(id);
 axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.map_key}`)
  .then( async (response) => {
      let results = response.data ? response.data.results : [];
      if(results.length !== 0){
        console.log(formatted_address(results[0]))            
        
          let loc = await location.create(formatted_address(results[0]))
          // console.log(loc)
          sup.setLocation(loc);
          res.status(200).json(loc);
      } else {
          res.status(400).json({message: `Can't Find Your Location`})
      }
  })
  .catch(err => {
      console.log(err)
      res.status(400).send(err)
  }) 

};


exports.searchCoordinates = async (req, res) => {
  const { lat, lng } = req.params;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.map_key}`)
        .then((response) => {
            let results = response.data ? response.data.results : [];
            if(results.length !== 0){
                  res.status(200).json(formatted_address(results[0]));
            } else {
                res.status(400).json({message: `Can't Find Your Location`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).send(err)
        }) 
};

exports.updateAddress = (req, res) => {
  let { id } = req.params;
  let { address } = req.body;
  console.log(id)
  // console.log(address)
  // console.log(req.body)
  location.update({address: address}, {returning: true, where: {id: id}})
  .then((doc) => {
    console.log(doc)
    res.status(200).json(doc);
  })
  .catch((err) => {
    console.log(">>Error While Saving Address! ", err);
    res.status(400).send({ error: err, message: 'Error While Saving Address!'});
  });

};





exports.findBrgyByCitymunCode = (req, res) => {
  let { citymunCode } = req.params
  console.log(citymunCode)
  Barangay.findAll({where: { citymunCode }})
    .then((barangays) => {
      res.status(200).json(barangays);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};

exports.findCitymunByProvCode = (req, res) => {
  let { provCode } = req.params
  console.log(provCode)
  Citymun.findAll({where: { provCode }})
    .then((barangays) => {
      res.status(200).json(barangays);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};

exports.findProvByRegCode = (req, res) => {
  let { regCode } = req.params

  Provinces.findAll({where: { regCode }})
    .then((barangays) => {
      res.status(200).json(barangays);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};

exports.findRegions = (req, res) => {
  let { regCode } = req.params

  Regions.findAll({where: { regCode }})
    .then((barangays) => {
      res.status(200).json(barangays);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};