const config = require('../../config/auth.config')
const db = require("../../models");
const axios = require('axios');


const Barangies = db.barangays;
const Citymun = db.cityMuns;
const Provinces = db.provinces;
const Regions = db.regions;
const Supporters = db.supporter;
const location = db.location;
const Users = db.user;
const Posts = db.post;
const Medias = db.media;

const Op = db.Sequelize.Op;



const { validateSupporterDetails, validateMapDetails } = require('../../utils/validators')
const { formatted_address } = require('../../utils/formatter');
const { countAge, toUpperCase } = require('../../utils/helpers');

exports.findAllPosts = (req, res) => {

  Posts.findAll({
    where: {isDeleted: false},
    include: [{ model: Medias, as: 'PostMedia', where: { isDeleted: false } }, { model: Users, attributes: ['id'], include: [{model: Supporters}, {model: Medias, as: 'UserProfile'}] }]
     }) 
    .then(doc => {
        let featuredPosts = doc.filter(a => a.postType === 'featured');
        let normalPosts = doc.filter(a => a.postType === 'normal');
        let archivePosts = doc.filter(a => a.postType === 'archive');
      console.log(featuredPosts)
      res.status(200).json({featuredPosts, normalPosts, archivePosts});
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};


exports.findBarangaySupporters = (req, res) => {
  let { brgyCode } = req.params

  Barangies.findAll({where: { brgyCode },
    include: [{ model: Supporters, as: 'BarangaySupport' }]
     })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};


exports.findProvinceCitymun = (req, res) => {

  Provinces.findAll({
    include: [{ model: Citymun, as: 'ProvinceCitymun' }]
     })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};


exports.findRegionProvinces = (req, res) => {

    Regions.findAll({
    include: [{ model: Provinces, as: 'RegionProvince' }]
     })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
      res.status(400).send(err);
    });
};