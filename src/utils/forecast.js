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
        
        summary0: body.daily.data[0].summary,
        maxTemp0: body.daily.data[0].temperatureMax,
        minTemp0: body.daily.data[0].temperatureMin,
     
        summary1: body.daily.data[1].summary,
        maxTemp1: body.daily.data[1].temperatureMax,
        minTemp1: body.daily.data[1].temperatureMin,
    
        summary2: body.daily.data[2].summary,
        maxTemp2: body.daily.data[2].temperatureMax,
        minTemp2: body.daily.data[2].temperatureMin,
    
        summary3: body.daily.data[3].summary,
        maxTemp3: body.daily.data[3].temperatureMax,
        minTemp3: body.daily.data[3].temperatureMin,

        summary4: body.daily.data[4].summary,
        maxTemp4: body.daily.data[4].temperatureMax,
        minTemp4: body.daily.data[4].temperatureMin,

        summary5: body.daily.data[5].summary,
        maxTemp5: body.daily.data[5].temperatureMax,
        minTemp5: body.daily.data[5].temperatureMin,
    
        summary6: body.daily.data[6].summary,
        maxTemp6: body.daily.data[6].temperatureMax,
        minTemp6: body.daily.data[6].temperatureMin,
    })
}

})


} 


module.exports = forecast