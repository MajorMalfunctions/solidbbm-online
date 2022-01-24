const { default: axios } = require('axios');
const config = require('../config/auth.config')
const db = require("../models");
const Supporter = db.supporter;
const Users = db.user;
const Mobiles = db.mobile;


exports.verifySms = (req, res) => {
    let { access_token, subscriber_number } = req.query;

    Mobiles.findOne({ where: { mobile: subscriber_number }, include: [{model: Supporter}]})
    .then(a => {
        if(a){
          Mobiles.update({token: access_token, isVerified: true }, { where: { mobile: subscriber_number }})
        } 
        res.status(200).json({message: 'Subscriber Verified!'})        
    })
    .catch(err => {
        console.log(err)
        res.status(200).json({message: 'Something went wrong!'})  
    })
   
    
};


exports.smsData = (req, res) => {
    res.status(200).json({body: req.body, query: req.query, params: req.params})      
};

exports.sendSms = async (req, res) => {

    
  await Mobiles.findAll({ where: { isVerified: true }, include: [{model: Supporter}]})
    .then(a => {
        if(a && a.length !== 0){
            for(mb in a){
                console.log(mb)
            }
        }
        // axios.post(`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/1234/requests?access_token=3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g`)


        res.status(200).json(a)  
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({message: 'Something went wrong!'})  
    })
};