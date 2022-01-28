const config = require('../config/auth.config')
const db = require("../models");
const axios = require('axios');
const Barangay = db.barangays;
const Citymun = db.cityMuns;
const Provinces = db.provinces;
const Regions = db.regions;
const Supporter = db.supporter;
const Location = db.location;
const Users = db.user;

exports.queryOpt = [
    { id: "province",
      model: Provinces,
      as: "RegionProvince"
     },
     { id: "citymun",
     model: Citymun,
     as: "ProvinceCitymun"
    },
    { id: "barangay",
    model: Barangay,
    as: "CitymunBarangay"
   },
   { id: "regLeaders",
   model: Users,
   as: "RegionLeader"
  },
  { id: "provLeaders",
  model: Users,
  as: "ProvinceLeader"
 },
 { id: "CitymunLeader",
 model: Users,
 as: "CitymunLeader"
},
{ id: "BrgyLeader",
model: Users,
as: "BrangayLeader"
},
{ id: "regSupport",
model: Supporter,
as: "RegionSupport"
},
{ id: "provSupport",
model: Supporter,
as: "ProvinceSupport"
},
{ id: "citymunSupport",
model: Supporter,
as: "CitymunSupport"
},
{ id: "brgySupport",
model: Supporter,
as: "BarangaySupport"
},
]