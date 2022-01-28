const { default: axios } = require('axios');
const config = require('../config/auth.config')
const db = require("../models");
const Supporter = db.supporter;
// const Users = db.user;

const Mobiles = db.mobile;
const { formatted_sms } = require('../utils/formatter');

exports.verifySms = (req, res) => {
    // let { code } = req.query;
    let { short } = req.params;
        // console.log(code)
        console.log(short)
        console.log(req.query)
    res.status(200).json({message: 'Success!'})

//     if(code){
      


//          axios.post(`https://developer.globelabs.com.ph/oauth/access_token?app_id=${config.smsAppId}&app_secret=${config.smsSecret}&code=${code}`)
//             .then(ab => {
//                 let { access_token, subscriber_number } = ab.data;


//                 Mobiles.findOne({ where: { mobile: subscriber_number }, include: [{model: Supporter}]})
//                 .then(a => {
               
//                 if(a){
//                     Mobiles.update({token: access_token, isVerified: true }, { where: { mobile: subscriber_number }})
//                      return    res.status(200).redirect('https://allinpaking.online')        
//                   } else {
//                       Mobiles.create({mobile: subscriber_number, isVerified: true, token: access_token });
//                       return   res.status(200).redirect('https://allinpaking.online')   
//                   }
//             })
//             .catch(err => {
//                // console.log(err)
//                console.log(err)
//                return res.status(400).redirect('https://allinpaking.online')  
//             })
//         })
//         .catch(err => {
//             // console.log(err)
//             console.log(err)
//             return res.status(400).redirect('https://allinpaking.online')  
//          })
    

//     } else {
//       let { access_token, subscriber_number } = req.query;
//        Mobiles.findOne({ where: { mobile: subscriber_number }, include: [{model: Supporter}]})
//         .then(a => {
//             if(a){
//               Mobiles.update({token: access_token, isVerified: true }, { where: { mobile: subscriber_number }})
//               return res.status(200).redirect('https://allinpaking.online') 
//             } else {
//                 Mobiles.create({mobile: subscriber_number, isVerified: true, token: access_token });
//                return res.status(200).redirect('https://allinpaking.online')
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             return res.status(400).redirect('https://allinpaking.online')
//         })
// }

};




exports.smsData = (req, res) => {
        let {  unsubscribed: { access_token, subscriber_number } } = req.body;
        console.log(req.params)
    console.log(req.body);
    res.status(200).json({message: 'Success!'})
    
        // Mobiles.findOne({ where: { mobile: subscriber_number, token: access_token  } })
    // .then(a => {
    //     console.log(a);
    //     if(a){
    //         Mobiles.update({isVerified: false }, { where: { mobile: subscriber_number }})
    //         return res.status(200).redirect('https://allinpaking.online') 
    //       } else {
    //           Mobiles.create({mobile: subscriber_number, isVerified: false, token: access_token });
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



exports.testEndpoint = (req, res) => {
    let { id } = req.query;
    console.log(req.params)
    res.status(200).json({message: 'Success!'})
};