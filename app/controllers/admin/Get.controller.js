const config = require('../../config/auth.config')
const db = require("../../models");
const axios = require('axios');
const { queryOpt } = require('../../utils/commonData');
const Barangay = db.barangays;
const Citymun = db.cityMuns;
const Provinces = db.provinces;
const Regions = db.regions;
const Supporter = db.supporter;
const Location = db.location;
const Users = db.user;



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
    let { regCode } = req.params;


    Regions.findAll({where: {
        regCode
    }, include: 
      [
      { model: Provinces, as: 'RegionProvince', 
      include: [
        { model: Citymun, as: 'ProvinceCitymun', 
          include: [
            {model: Barangay, as: 'CitymunBarangay', 
            include: [
              {model: Supporter, as: 'BarangaySupport' },
              { model: Users, as: 'BrangayLeader' }
            ]
          },
            { model: Users, as: 'CitymunLeader' },
          ],
          required: false
          },
          { model: Users, as: 'ProvinceLeader', required: false },
          ],
      required: true
        },

        //  include: [{
        //   model: Barangay, as: 'CitymunBarangay', 
        //   include: [{
        //      model: Users, as: 'BrangayLeader'
        //   }]
          // }
          // { model: Users, as: 'CitymunLeader'}
     
     
        
      { model: Users, as: 'RegionLeader', required: false }
    ] 
    // {all: true, include: { all: true, include: { all: true } }}
  })
    .then(rs => {
      console.log(rs)
     return res.status(200).json(rs);
    })
    .catch(err => {
      console.log(err)
    return res.status(400).json(err)
    })
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

exports.getRegionData = async (req, res) => {
  let { id, code } = req.query;
  console.log(id)
  console.log(code)
  // console.log(req.params)

  let opt = queryOpt.filter(a => a.id === id);
    console.log(opt)
  // res.status(200).json(req.params)
  try {
     Regions.findAll({where: { regCode: code },include: opt})
     .then(rs => {
     return res.status(200).json(rs)
     })
     .catch(err => {
        res.status(400).json(err)
     })
    

  } catch(err) {
    console.log(err)
   res.status(400).json(err)
  }
};

exports.getProvinceData = async (req, res) => {
  console.log(req.params)
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


exports.getCitymunData = async (req, res) => {
  console.log(req.params)
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

exports.getBarangayData = async (req, res) => {
  console.log(req.params)
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
