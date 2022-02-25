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

exports.formatted_sms = (address, supporter, message) => {
    // let text = `Salamat ${supporter.firstName} ${supporter.lastName} an imo supporta. `

    return { 
            outboundSMSMessageRequest: {
        senderAddress: config.smsCode,
        outboundSMSTextMessage: {message},
        address: address
      }
    }
}

exports.dataForm = {
    supporter: (val) => {
        let barangay = val.BarangaySupport.brgyDesc;
        let region = val.RegionSupport.regDesc;
        let province = val.ProvinceSupport.provDesc;
        let city = val.CitymunSupport.citymunDesc;
        let mobile = val.mobiles.length != 0 ? val.mobiles[0].mobile : "";
        let smsToken = val.mobiles.length != 0 ? val.mobiles[0].token : ""
        let smsVerified = val.mobiles.length != 0 ? val.mobiles[0].isVerified : false;

        return {
            id: val.id,
            fullName: `${val.lastName}, ${val.firstName}${val.middleName ? ' '+val.middleName : ''}`,
            age: val.age,
            isVerified: val.isVerified,
            region, province, city, barangay,
            mobile,
            smsToken,
            smsVerified
        }
    }
}