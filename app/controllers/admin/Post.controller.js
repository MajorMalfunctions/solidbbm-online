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


exports.postOption = (req, res) => {
  res.status(200).send("User Content.");
};

exports.newPost = async (req, res) => {
    let { userId } = req;
    let { PostMedia } = req.body;
  let postMedia = PostMedia.map(a => { return a.id });

await Posts.create({...req.body, userId})
.then(doc => {
  console.log(doc)
  doc.setPostMedia(postMedia);

  res.status(200).json({message: { text: 'Successfuly Save Post!', type: 'success'}});
})
.catch(err => {
  res.status(400).send({ error: err, message: { text: 'Error While Saving Post!', type: 'error'}});
})


  








};

exports.uploadFile = (req, res) => {
  res.status(200).send("User content")
}
