const config = require('../config/auth.config')


exports.myMap = (data) => {
    let { latitude, longitude, address_components, geometry, placeId, types, formatted_address } = data
    return {
        latitude, longitude, address_components, geometry, placeId, types, formatted_address
    }
}

exports.formatted_address = (data) => {
    let {  formatted_address, geometry } = data
    return {
        address: formatted_address,
        lat: geometry?.location?.lat,
        lng: geometry?.location?.lng
    }
}

exports.formatted_sms = (address, message) => {
    // let text = `Salamat ${supporter.firstName} ${supporter.lastName} an imo supporta. `

    return { 
            outboundSMSMessageRequest: {
        senderAddress: config.smsCode,
        outboundSMSTextMessage: {message},
        address: address
      }
    }
}