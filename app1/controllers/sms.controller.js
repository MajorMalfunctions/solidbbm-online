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
                                     return res.status(200).redirect(`https://docampaign.online/app/home/${subscriber_number}`)        
                                  } else {
                                      Mobiles.create({subscriber_number: subscriber_number, code: doc.code, short: doc.short, isVerified: true, access_token: access_token })
                                      .then(mob => {
                                          mob.setApps([doc]);
                                               return res.status(200).redirect(`https://docampaign.online/app/home/${subscriber_number}`)      
                                      })
                                      .catch(err => {
                                        // console.log(err)
                                        return res.status(400).redirect('https://docampaign.online/app/home/error')  
                                     })
                                  }
                            })
                            .catch(err => {
                               // console.log(err)
                               console.log(err)
                               return res.status(400).redirect('https://docampaign.online/app/home/error')  
                            })
                        })
                        .catch(err => {
                            // console.log(err)
                            console.log(err)
                            return res.status(400).redirect('https://docampaign.online/app/home/error')  
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
                              return res.status(200).redirect(`https://docampaign.online/app/home/${subscriber_number}`) 
                            } else {
                                Mobiles.create({subscriber_number: subscriber_number, code: doc.code, short: doc.short, isVerified: true, access_token: access_token })
                                      .then(mob => {
                                          mob.setApps([doc]);
                                               return res.status(200).redirect(`https://docampaign.online/app/home/${subscriber_number}`)      
                                      })
                                      .catch(err => {
                                        // console.log(err)
                                        return res.status(400).redirect(`https://docampaign.online/app/home/error`)  
                                     })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            return res.status(400).redirect('https://docampaign.online/app/home/error')
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
    console.log(req.body)
    let { short } = req.params;

try {


  if(!short) return  res.status(400).json({message: 'No Short Code!'}) 

 if(mobs && mobs.length == 0) return res.status(400).json({message: 'No Mobiles on body'})

 let sapp = await SmsApp.findOne({where: { short: String(short) }, include: [{model: Mobiles, where: { isVerified: true }, required: false}]});

 let {mobiles} = sapp;
          

    if(!mobiles || mobiles && mobiles.length == 0 ) return res.status(400).json({message: 'No Mobiles verified'})
    const promises = mobiles.map( async (abc, index) => {
            // let status = { subscriber_number: obj.subscriber_number, isSuccess: null }
            let ind = await mobs.indexOf(abc.subscriber_number);
            if(ind !== -1){
                console.log(sapp.short)
              let status = await axios.post(`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/${sapp.short}/requests?access_token=${abc.access_token}`, formatted_sms(abc.subscriber_number, req.body.message, index))
                .then(ab => {
                  return { subscriber_number: abc.subscriber_number, isSuccess: true }  
                 })
                 .catch(err => {
                     console.log('Sending Error')
                    console.log(err)
                  return { subscriber_number: abc.subscriber_number, isSuccess: false }  
                })
             return status
            } else {
                return  { subscriber_number: abc.subscriber_number, isSuccess: null }
            }
    } )
    const procData = await Promise.all(promises);
    //   console.log(doc)
   return res.status(200).json({status: 'Success !', procData})

} catch (err) {
    console.log(err)
    return res.status(400).json({message: 'Cant Find Short Code!'})
}

};


exports.sendAllSms = async (req, res) => {
  let { short } = req.params;
    console.log(req.body)
try {

console.log(short)
if(!short) return  res.status(400).json({message: 'No Short Code!'}) 


let sapp = await SmsApp.findOne({where: { short: String(short) }, include: [{model: Mobiles, where: { isVerified: true }, required: false}]});

let {mobiles} = sapp;
        

  if(!mobiles || mobiles && mobiles.length == 0 ) return res.status(400).json({message: 'No Mobiles verified'})
  const promises = mobiles.map( async (abc, index) => {
          // let status = { subscriber_number: obj.subscriber_number, isSuccess: null }
          let ind = abc.isVerified;
          if(ind){
            let status = await axios.post(`https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/${sapp.short}/requests?access_token=${abc.access_token}`, formatted_sms(abc.subscriber_number, req.body.message, index))
              .then(ab => {
                return { subscriber_number: abc.subscriber_number, isSuccess: true }  
               })
               .catch(err => {
                   console.log('Sending Error')
                  console.log(err)
                return { subscriber_number: abc.subscriber_number, isSuccess: false }  
              })
           return status
          } else {
              return  { subscriber_number: abc.subscriber_number, isSuccess: null }
          }
  } )
  const procData = await Promise.all(promises);
  //   console.log(doc)
 return res.status(200).json({status: 'Success !', procData})

} catch (err) {
  console.log(err)
  return res.status(400).json({message: 'Cant Find Short Code!'})
}

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