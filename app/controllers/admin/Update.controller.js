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
const Medias = db.media



exports.updatePost = (req, res) => {
  let { id } = req.params;
  let { title, when, what, PostMedia } = req.body;
  let postMedia = PostMedia.map(a => { return a.id });
  console.log(req.body)
  console.log(id)

  Posts.findByPk(id).then(doc => {
    Posts.update(
      {title, when, what},
      {where: { id }}
    ).then(docs => {
      doc.setPostMedia(postMedia);
      res.status(200).json({message: { text: 'Successfuly Update Post!', type: 'success'}});
    })
    .catch(err => {
      console.log(err)
      res.status(400).send({ error: err, message: { text: 'Error While Saving Post!', type: 'error'}});
    })
  })
  .catch(err => {
    console.log(err)
    res.status(400).send({ error: err, message: { text: 'Error While Saving Post!', type: 'error'}});
  })
};

exports.archivePost = (req, res) => {
  let { id } = req.params;

    Posts.update(
      {postType: "archive"},
      {where: { id }}
    ).then(docs => {
      res.status(200).json({message: { text: 'Successfuly Archive Post!', type: 'success'}});
    })
  .catch(err => {
    console.log(err)
    res.status(400).send({ error: err, message: { text: 'Error While Saving Post!', type: 'error'}});
  })
};


exports.updateUpload = (req, res) => {
  res.status(200).send("Moderator Content.");
};