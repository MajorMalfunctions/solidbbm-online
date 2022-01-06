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