const request = require ('request');

let address = process.argv[2];
const geocode = (address, cb)=> {
let mapboxUrl =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoib2RlZHNlbW8iLCJhIjoiY2swaTZ2ZjFpMDllNzNtbXo2aG54c2MxZSJ9.mBmClI_qcSXxzG7i_tJvng`
request ({url: mapboxUrl, json: true}, (error, {body}) => {
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

geocode (address, (error, {lat, long, location}) => {
    if (error){
        console.log(error);
        
    }else if (!address){
console.log('no address');

    }else{
        console.log(lat, long, location) ;
        
        

 }

})
// const forecast = (lat, long, cb) => {

//     const darkskyUrl = `https://api.darksky.net/forecast/906d2597a4c1c17eec9b60faeb781a22/${lat},${long}?units=si`
// request ({url: darkskyUrl, json: true}, (error, response) =>{
// if (error){
//     cb('low level error, check intenet connection', undefined )
// }else if (response.body.error){
//     cb (`forcast services responded: ${ response.body.error}`, undefined)
// }else{
//     cb (undefined, {
//         temp : response.body.currently.temperature,
//         summary: response.body.daily.data[0].summary,
//         tommorowsHigh: response.body.daily.data[1].temperatureHigh,
//         tommorowsLow: response.body.daily.data[1].temperatureLow,
//     })
// }

// })


// } 