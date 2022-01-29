const { default: axios } = require('axios');
const config = require('../config/auth.config')
const db = require("../models");
// const Users = db.user;

const Mobiles = db.mobile;
const SmsApp = db.app;
const { formatted_sms } = require('../utils/formatter');

exports.verifySms = (req, res) => {
    let { code } = req.query;
    let { short } = req.params;
    if(short){
    SmsApp.findOne({where: { short: short }})
    .then(doc => {
                   if(code){
                         axios.post(`https://developer.globelabs.com.ph/oauth/access_token?app_id=${doc.appkey}&app_secret=${doc.appsecret}&code=${code}`)
                            .then(ab => {
                                let { access_token, subscriber_number } = ab.data;
                                Mobiles.findOne({ where: { subcriber_number: subscriber_number, code: doc.code }})
                                .then(a => {
                            
                                if(a){
                                    Mobiles.update({access_token: access_token, code: doc.code, short: doc.short, isVerified: true }, { where: { subcriber_number: subscriber_number, code: doc.code  }})
                                     return    res.status(200).redirect('https://allinpaking.online')        
                                  } else {
                                      Mobiles.create({subcriber_number: subscriber_number, code: doc.code, short: doc.short, isVerified: true, access_token: access_token })
                                      .then(mob => {
                                          mob.setApps([mob]);
                                        return   res.status(200).redirect('https://allinpaking.online')  
                                      })
                                      .catch(err => {
                                        // console.log(err)
                                        console.log(err)
                                        return res.status(400).redirect('https://allinpaking.online')  
                                     })
                                  }
                            })
                            .catch(err => {
                               // console.log(err)
                               console.log(err)
                               return res.status(400).redirect('https://allinpaking.online')  
                            })
                        })
                        .catch(err => {
                            // console.log(err)
                            console.log(err)
                            return res.status(400).redirect('https://allinpaking.online')  
                         })
                    

                    } else {
                      let { access_token, subscriber_number } = req.query;
                       Mobiles.findOne({ where: { subcriber_number: subscriber_number, code: doc.code  }})
                        .then(a => {
                            if(a){
                              Mobiles.update({access_token: access_token, isVerified: true }, { where: { subcriber_number: subscriber_number, code: doc.code }})
                              return res.status(200).redirect('https://allinpaking.online') 
                            } else {
                                Mobiles.create({subcriber_number: subscriber_number, isVerified: true, access_token: access_token, code: doc.code, short: doc.short, isVerified: true });
                               return res.status(200).redirect('https://allinpaking.online')
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            return res.status(400).redirect('https://allinpaking.online')
                        })
                }
    })
    .catch(err => {
        res.status(400).json({message: 'Cant Find Short Code!', error: err})
    })
        } else {
            res.status(400).json({message: 'No Short Code'})
        }





};




exports.smsData = (req, res) => {
    let { short } = req.params;
        let {  unsubscribed, inboundSMSMessageList } = req.body;

        if(short){
            SmsApp.findOne({where: { short: short }})
            .then(doc => {
                if(unsubscribed){
                    let {  access_token, subscriber_number } = unsubscribed;

                                Mobiles.findOne({ where: { subcriber_number: subscriber_number,access_token: access_token, short: doc.short  } })
                                    .then(a => {
                                        console.log(a);
                                        if(a){
                                            Mobiles.update({isVerified: false }, { where: { id: a.id }})
                                            return res.status(200).redirect('https://allinpaking.online') 
                                          } else {
                                              Mobiles.create({
                                                  subcriber_number: subscriber_number, isVerified: false, access_token: access_token, short: doc.short, code: doc.code
                                                });
                                             return res.status(200).redirect('https://allinpaking.online')
                                          }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        return res.status(400).redirect('https://allinpaking.online')
                                    })
                   return res.status(200).json({message: 'Unsubscribed!', data: unsubscribed})
                }
                if(inboundSMSMessageList){
                    return res.status(200).json({message: 'SMS RECEIVED', data: inboundSMSMessageList})
                }
            })
            .catch(err => {
               return res.status(400).json({message: 'Cant Find Short Code!', error: err})
            })
            } else {
                return  res.status(400).json({message: 'No Short Code!'})
            }

        // Mobiles.findOne({ where: { subcriber_number: subscriber_number,access_token: access_token  } })
    // .then(a => {
    //     console.log(a);
    //     if(a){
    //         Mobiles.update({isVerified: false }, { where: { subcriber_number: subscriber_number }})
    //         return res.status(200).redirect('https://allinpaking.online') 
    //       } else {
    //           Mobiles.create({subcriber_number: subscriber_number, isVerified: false,access_token: access_token });
    //          return res.status(200).redirect('https://allinpaking.online')
    //       }
    // })
    // .catch(err => {
    //     console.log(err)
    //     return res.status(400).redirect('https://allinpaking.online')
    // })
};

exports.sendSms = (req, res) => {
    // let smsCode = 


   Mobiles.findAll({ where: { isVerified: true }})
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



exports.testEndpoint = (req, res) => {
    let { code } = req.query;
    let { short } = req.params;
       
    
};