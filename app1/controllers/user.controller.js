const config = require('../config/auth.config')
const db = require("../models");
const axios = require('axios');


const Barangay = db.barangays;
const Citymun = db.cityMuns;
const Provinces = db.provinces;
const Regions = db.regions;
const Supporters = db.supporter;
const location = db.location;
const Mobiles = db.mobile;
const Op = db.Sequelize.Op;



const { validateSupporterDetails, validateMapDetails } = require('../utils/validators')
const { formatted_address } = require('../utils/formatter');
const { countAge, toUpperCase } = require('../utils/helpers');


exports.createSupporterDetails = async (req, res) => {
  delete req.body.id 
  const { valid, errors } = validateSupporterDetails(req.body);
  if (!valid) return res.status(400).json({ errors, message: { text: 'Something went wrong!', type: 'error'}});
  

  let { firstName, lastName, birthDate, contact, regCode, brgyCode, citymunCode, provCode, middleName  } = toUpperCase(req.body);
  let age = countAge(birthDate);
  let bar = await Barangay.findOne({where: {
    brgyCode: brgyCode
  }});

  let city = await Citymun.findOne({where: {
    citymunCode: citymunCode
  }});

  let prov = await Provinces.findOne({where: {
    provCode: provCode
  }});

  let reg = await Regions.findOne({where: {
    regCode: regCode
  }});


  let mob = await Mobiles.findOne({where: {
    mobile: contact
  }})

  let mobnum = mob ? mob : await Mobiles.create({mobile: contact});


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
    if(!doc){
     return Supporters.create({
        firstName, lastName, birthDate, contact, middleName, age
      })
      .then(sup => {
        console.log(mobnum)
        sup.addMobile(mobnum)
        bar.addBarangaySupport(sup);
        city.addCitymunSupport(sup);
        prov.addProvinceSupport(sup);
        reg.addRegionSupport(sup);
        //  sup.setBarangaySupport([bar]);
        //  bar.addBarangaySupports(sup);
          return res.status(200).json(sup);
      })
      .catch((err) => {
        console.log(">>Error While Saving Supporter! ", err);
        return res.status(400).json({ errors: err, message: { text: 'Something went wrong!', type: 'error'}, steps: 0});
      });
    } else {
      if(doc.locationId){
        return res.status(400).json({ message: { text: 'Already exist on Master List!',type: 'warning'},  steps: 0});
      }else {
        return res.status(400).json({ message: { text: 'Pin your location!', steps: 1, type: 'warning'},  steps: 1});
      }
    }
  })
  .catch((err) => {
    console.log(">>Something went wrong! ", err);
    return res.status(400).json({ errors: err, message: { text: 'Something went wrong!', type: 'error'}, steps: 0});
  });
};


exports.pinSupporterLocation = async (req, res) => {
  const { id } = req.params;
  const { lat, lng, address, zoom } = req.body;


  const { valid, errors } = validateMapDetails({lat,lng,id});
  if (!valid) return res.status(400).json(errors);




  let sup = await Supporters.findByPk(id);
 axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.map_key}`)
  .then( async (response) => {
      let results = response.data ? response.data.results : [];
      if(results.length !== 0){
        console.log(formatted_address(results[0]))            
        
          let loc = await location.create({...formatted_address(results[0]), address, zoom  })
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
  console.log(req.params)
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

  Regions.findAll()
    .then((barangays) => {
      res.status(200).json(barangays);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};