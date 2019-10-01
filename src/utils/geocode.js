const request = require ('request');

const geocode = (address, cb)=> {
let mapboxUrl =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoib2RlZHNlbW8iLCJhIjoiY2swaTZ2ZjFpMDllNzNtbXo2aG54c2MxZSJ9.mBmClI_qcSXxzG7i_tJvng`
request ({url: mapboxUrl, json: true}, (error, {body}={}) => {
    if (error){
        cb ('low level error, check internet connection', undefined)
    }else if (body.features.length === 0){
        cb ('invalid input, check address', undefined)

    }else{
        cb( undefined,
            {
         lat : body.features[0].center[1],
         long: body.features[0].center[0],   
         location: body.features[0].place_name
        })
    }
})
}



  module.exports = geocode