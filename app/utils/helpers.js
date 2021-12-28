const deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }



exports.polylineDecode = function(str, precision) {
    console.log(str)
    console.log(precision)

    var index = 0,
        lat = 0,
        lng = 0,
        coordinates = [],
        shift = 0,
        result = 0,
        byte = null,
        latitude_change,
        longitude_change,
        factor = Math.pow(10, 5 || 6);
    console.log(factor);

    // Coordinates have variable length when encoded, so just keep
    // track of whether we've hit the end of the string. In each
    // loop iteration, a single coordinate is decoded.
    while (index < str.length) {

        // Reset shift, result, and byte
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
};



exports.getDistanceFromLatLonInKm = (latitude1,longitude1,latitude2,longitude2,units) => {
    var earthRadius = 6371; // Radius of the earth in km
    var dLat = deg2rad(latitude2-latitude1);  // deg2rad below
    var dLon = deg2rad(longitude2-longitude1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = earthRadius * c; 
    var miles = d / 1.609344; 
  
  if ( units == 'km' ) {  
      console.log(d)
  return d; 
   } else {
    console.log(miles)

  return miles; 
  }


 

  }

 