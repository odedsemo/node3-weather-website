const request = require ('request')

const forecast = (lat, long, cb) => {

    const darkskyUrl = `https://api.darksky.net/forecast/906d2597a4c1c17eec9b60faeb781a22/${lat},${long}?units=si`
request ({url: darkskyUrl, json: true}, (error, {body}) =>{
if (error){
    cb('low level error, check intenet connection', undefined )
}else if (body.error){
    cb (`forcast services responded: ${ body.error}`, undefined)
}else{
    cb (undefined, {
        temp : body.currently.temperature,
        summary: body.daily.data[0].summary,
        tommorowsHigh: body.daily.data[1].temperatureHigh,
        tommorowsLow: body.daily.data[1].temperatureLow,
    })
}

})


} 

const forecast2 = (lat, long, cb) => {

    const darkskyUrl = `https://api.darksky.net/forecast/906d2597a4c1c17eec9b60faeb781a22/${lat},${long}?units=si`
request ({url: darkskyUrl, json: true}, (error, response) =>{
if (error){
    cb('low level error, check intenet connection', undefined )
}else if (response.body.error){
    cb (`forcast services responded: ${ response.body.error}`, undefined)
}else{
    cb (undefined, {
        temp :response.body.currently.temperature,
        summary: response.body.daily.data[0].summary,
        tommorowsHigh: response.body.daily.data[1].temperatureHigh,
        tommorowsLow: response.body.daily.data[1].temperatureLow,
    })
}

})
}

forecast2 (34, -118, (error, data) =>{

})
module.exports = forecast