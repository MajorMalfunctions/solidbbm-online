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
    if(!short) return res.status(400).json({message: 'Missing Short Code!'})
    SmsApp.findOne({where: { short: String(short) }})
    .then(doc => {
        console.log(short)
                   if(code){
                    console.log('WEB OPT VERIFY')
                         axios.post(`https://developer.globelabs.com.ph/oauth/access_token?app_id=${doc.appkey}&app_secret=${doc.appsecret}&code=${code}`)
                            .then(ab => {
                            // let access_token = 'awda'
                            // let subscriber_number = '974461641'
                                let { access_token, subscriber_number } = ab.data;
                                console.log(ab.data)
                                Mobiles.findOne({ where: { 
                                    [Op.and]: [
                                        { subscriber_number },
                                        { code: doc.code }
                                      ]
                                  }})
                                .then(a => {
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
                        })
                        .catch(err => {
                            // console.log(err)
                            console.log(err)
                            return res.status(400).redirect('https://allinpaking.online')  
                         })
                    

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
      if(!short) return  res.status(400).json({message: 'No Short Code!'})
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
                                        return res.status(200).json({message: 'Unsubscribed!'})

                                      } else {
                                        Mobiles.create({
                                            subscriber_number: subscriber_number, isVerified: false, access_token: access_token, short: doc.short, code: doc.code
                                          })
                                        .then(mob => {
                                            mob.setApps([doc]);
                                           return res.status(200).json({message: 'Unsubscribed!'})
                                        })
                                        .catch(err => {
                                          // console.log(err)
                                          return res.status(200).json({message: 'Unsubscribed Error!'})
                                       })
                                      }
                                })
                                .catch(err => {
                                    console.log(err)
                                    console.log('Unsibscribe Error!')
                                    return res.status(200).json({message: 'Unsubscribed Error!'})

                                })
            }
            if(inboundSMSMessageList){
                return res.status(200).json({message: 'SMS RECEIVED', data: inboundSMSMessageList})
            }
        })
        .catch(err => {
            console.log(err)
            console.log('Cant Find Short Code!')
           return res.status(400).json({message: 'Cant Find Short Code!'})
        })
};

exports.sendSms = async (req, res) => {
    let mobs = req.body.mobiles;

    let { short } = req.params;
  if(!short) return  res.status(400).json({message: 'No Short Code!'}) 

    if(mobs && mobs.length == 0) return res.status(400).json({message: 'No Mobiles'})


await SmsApp.findOne({where: { short: String(short) }, include: [{model: Mobiles, where: { isVerified: true }, required: false}]})
  .then(doc => {
        let {mobiles} = doc;
            let recmob = mobs.map(a =>{
                console.log(a)
                let obj = mobiles.forEach(ab => {
                    // String(ab.subscriber_number) == String(a)
                    console.log(String(ab.subscriber_number) == String(a))
                    console.log(String(ab.subscriber_number))
                    console.log(ab)
                    return ab
                });
                return  obj
            }) 
            
            console.log(recmob)
    if(!doc || !recmob) return res.status(400).json({message: 'No Mobiles'})
      for(const mb in  recmob){
            console.log(recmob[mb])
     recmob[mb] && axios.post(`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/${doc.short}/requests?access_token=${recmob[mb].access_token}`, formatted_sms(recmob[mb].subscriber_number, req.body.message))
                .then(ab => {
                     console.log(ab)
                     return ab
                 })
                 .catch(err => {

                    console.log(err)
                    return 
                })
    }
    //   console.log(doc)
    res.status(200).json('Success !')
})
.catch(err => {
    console.log(err)
    console.log('Cant Find Short Code!')
   return res.status(400).json({message: 'Cant Find Short Code!'})
})

};

exports.getAllMobile = (req, res) => {

    Mobiles.findAll({include: [{
      model: SmsApp,
      required: false
  }] })
    .then(doc => {
      return  res.status(200).json(doc);
    }) 
    .catch(err => {
        console.log(err)
        return res.status(400).json({message: 'Something Went Wrong!'})
    })
};

exports.testEndpoint = (req, res) => {
    let { code } = req.query;
    let { short } = req.params;
       
    return  res.status(200).json({message: 'TESTING'});
};