const { default: axios } = require('axios');
const config = require('../config/auth.config')
const db = require("../models");
// const Users = db.user;

const Mobiles = db.mobile;
const SmsApp = db.app;

const Op = db.Sequelize.Op;

const { formatted_sms } = require('../utils/formatter');

exports.verifySms = (req, res) => {
    let { code } = req.query;
    let { short } = req.params;
    console.log(!short)
    if(!short) return res.status(400).json({message: 'Missing Short Code!'})
    SmsApp.findOne({where: { short: String(short) }})
    .then(doc => {
        console.log(doc)
        console.log(code)
        console.log(short)
                   if(code){
                    console.log('WEB OPT VERIFY')
                        //  axios.post(`https://developer.globelabs.com.ph/oauth/access_token?app_id=${doc.appkey}&app_secret=${doc.appsecret}&code=${code}`)
                        //     .then(ab => {
                            let access_token = 'awda'
                            let subscriber_number = '974461641'
                                // let { access_token, subscriber_number } = ab.data;
                                // console.log(ab.data)
                                Mobiles.findOne({ where: { 
                                    [Op.and]: [
                                        { subscriber_number },
                                        { code: doc.code }
                                      ]
                                  }})
                                .then(a => {
                                        console.log(a)
                                if(a){
                                    Mobiles.update({access_token: access_token, code: doc.code, short: doc.short, isVerified: true }, { where: {    [Op.and]: [
                                        { subscriber_number },
                                        { code: doc.code }
                                      ]  }})
                                     return res.status(200).redirect('https://allinpaking.online')        
                                  } else {
                                      Mobiles.create({subscriber_number: subscriber_number, code: doc.code, short: doc.short, isVerified: true, access_token: access_token })
                                      .then(mob => {
                                          mob.setApps([doc]);
                                               return res.status(200).redirect('https://allinpaking.online')      
                                      })
                                      .catch(err => {
                                        // console.log(err)
                                        return res.status(400).redirect('https://allinpaking.online')  
                                     })
                                  }
                            })
                            .catch(err => {
                               // console.log(err)
                               console.log(err)
                               return res.status(400).redirect('https://allinpaking.online')  
                            })
                        // })
                        // .catch(err => {
                        //     // console.log(err)
                        //     console.log(err)
                        //     return res.status(400).redirect('https://allinpaking.online')  
                        //  })
                    

                    } else {
                        console.log('SMS VERIFY')
                      let { access_token, subscriber_number } = req.query;
                       Mobiles.findOne({ where: { 
                        [Op.and]: [
                            { subscriber_number },
                            { code: doc.code }
                          ]
                      }})
                        .then(a => {
                            if(a){
                              Mobiles.update({access_token: access_token, isVerified: true }, { where: { 
                                [Op.and]: [
                                    { subscriber_number },
                                    { code: doc.code }
                                  ]
                              }})
                              return res.status(200).redirect('https://allinpaking.online') 
                            } else {
                                Mobiles.create({subscriber_number: subscriber_number, code: doc.code, short: doc.short, isVerified: true, access_token: access_token })
                                      .then(mob => {
                                          mob.setApps([doc]);
                                               return res.status(200).redirect('https://allinpaking.online')      
                                      })
                                      .catch(err => {
                                        // console.log(err)
                                        return res.status(400).redirect('https://allinpaking.online')  
                                     })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            return res.status(400).redirect('https://allinpaking.online')
                        })
                }
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({message: 'Cant Find Short Code!', error: err})
    })

};




exports.smsData = (req, res) => {
    let { short } = req.params;
        let {  unsubscribed, inboundSMSMessageList } = req.body;
try {
    if(short){
        SmsApp.findOne({where: { short: String(short) }})
        .then(doc => {
            if(unsubscribed){
                let {  access_token, subscriber_number } = unsubscribed;

                            Mobiles.findOne({ where: { [Op.and]: [
                                { subscriber_number },
                                { access_token: access_token },
                                { short: doc.short }
                              ]  }})
                                .then(a => {
                                    console.log(a);
                                    if(a){
                                        Mobiles.update({isVerified: false }, { where: { id: a.id }})
                                        return res.status(200).json({message: 'Unsubscribed!', data: unsubscribed})

                                      } else {
                                          Mobiles.create({
                                              subscriber_number: subscriber_number, isVerified: false, access_token: access_token, short: doc.short, code: doc.code
                                            });
                                            return res.status(200).json({message: 'Unsubscribed!', data: unsubscribed})

                                      }
                                })
                                .catch(err => {
                                    console.log(err)
                                    console.log('Unsibscribe Error!')
                                    return res.status(200).json({message: 'Unsubscribed Error!', data: unsubscribed})

                                })
            }
            if(inboundSMSMessageList){
                return res.status(200).json({message: 'SMS RECEIVED', data: inboundSMSMessageList})
            }
        })
        .catch(err => {
            console.log(err)
            console.log('Cant Find Short Code!')
           return res.status(400).json({message: 'Cant Find Short Code!', error: err})
        })
        } else {
            console.log('No Short Code')
            return  res.status(400).json({message: 'No Short Code!'})
        }
} catch(err) {
    console.log(err)
    console.log('Something Went wrong')
    return  res.status(400).json({message: 'Something Went Wrong'})
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