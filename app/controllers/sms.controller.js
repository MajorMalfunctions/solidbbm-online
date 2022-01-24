const { default: axios } = require('axios');
const config = require('../config/auth.config')
const db = require("../models");
const Supporter = db.supporter;
const Users = db.user;
const Mobiles = db.mobile;
const { formatted_sms } = require('../utils/formatter');

exports.verifySms = (req, res) => {
    let { access_token, subscriber_number } = req.query;

    Mobiles.findOne({ where: { mobile: subscriber_number }, include: [{model: Supporter}]})
    .then(a => {
        if(a){
          Mobiles.update({token: access_token, isVerified: true }, { where: { mobile: subscriber_number }})
            res.status(200).json({message: 'Subscriber Verified!'})        
        } else {
            Mobiles.create({mobile: subscriber_number, isVerified: true, token: access_token });
            res.status(200).json({message: 'Subscriber Verified!'})    
        }
    })
    .catch(err => {
        console.log(err)
        res.status(200).json({message: 'Something went wrong!'})  
    })
   
    
};


exports.smsData = (req, res) => {
    res.status(200).json({body: req.body, query: req.query, params: req.params})      
};

exports.sendSms = (req, res) => {

    
   Mobiles.findAll({ where: { isVerified: true }, include: [{model: Supporter}]})
    .then(a => {
        if(a && a.length !== 0){
            for(const mb in a){
                console.log(a[mb].token)
                 axios.post(`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/${config.smsCode}/requests?access_token=${a[mb].token}`, formatted_sms(a[mb].mobile, a[mb].supporters, req.body.message))
                 .then(ab => {
                    //  console.log(ab)
                 })
                 .catch(err => {
                    // console.log(err)
                 })
            }
               res.status(200).json(a)  
        } else {
            res.status(200).json({message: 'No mobiles'})  
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({message: 'Something went wrong!'})  
    })
};