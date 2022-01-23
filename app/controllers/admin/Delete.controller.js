const config = require('../../config/auth.config')
const db = require("../../models");
const axios = require('axios');
const { formatted_address } = require('../../utils/formatter');
const Barangay = db.barangays;
const Citymun = db.cityMun;
const provinces = db.provinces;
const regions = db.regions;
const supporter = db.supporter;
const location = db.location;
const Users = db.user;
const Posts = db.post;
const Medias = db.media;




exports.deletePost = (req, res) => {
    let { id } = req.params;
 
      Posts.update(
        {isDeleted: true},
        {where: { id }}
      ).then(docs => {
        res.status(200).json({message: { text: 'Successfuly Deleted Post!', type: 'success'}});
      })
      .catch(err => {
        console.log(err)
        res.status(400).send({ error: err, message: { text: 'Error While Saving Post!', type: 'error'}});
      })
  
};

exports.deleteMedia = (req, res) => {
  console.log('weweww')
  let { id } = req.params;
  console.log(id)
    Medias.update(
      {isDeleted: true},
      {where: { id }}
    ).then(docs => {
      console.log(docs)
      res.status(200).json({message: { text: 'Successfuly Deleted Post!', type: 'success'}});
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: err, message: { text: 'Error While Saving Post!', type: 'error'}});
    })
};