exports.myMap = (data) => {
    let { latitude, longitude, address_components, geometry, placeId, types, formatted_address } = data
    return {
        latitude, longitude, address_components, geometry, placeId, types, formatted_address
    }
}