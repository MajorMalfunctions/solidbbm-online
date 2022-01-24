const config = require('../config/auth.config')
const db = require("../models");
const Supporter = db.supporter;
const Users = db.user;
const Mobiles = db.mobile;


exports.verifySms = (req, res) => {
    let { access_token, subscriber_number } = req.query;

    console.log('verify')
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.status(200).json({body: req.body, query: req.query, params: req.params})  
};


exports.smsData = (req, res) => {
    console.log('smsData')
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.status(200).json({body: req.body, query: req.query, params: req.params})      
};


exports.sendSms = (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log('sendSMs')
    res.status(200).json({body: req.body, query: req.query, params: req.params})      
};