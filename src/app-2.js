const forecast = require('../../weather-app/utils/forecast.js')
const geocode = require('../../weather-app/utils/geocode.js')
const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'chipsili kipodet'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpMessage: 'How can chipsili kipodet help you?'  
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'chipsili kipodet'
    })
})



app.get('/weather', (req, res) => {
geocode ('paris', (error, {lat, long, location}) => {
        if (error){
        console.log('error: ', error);
         }else{
    
       forecast (lat ,long ,(error,{temp,tommorowsHigh, tommorowsLow, summary}) => {
           if (error){
            console.log('error: ', error);
           }else{
            
            console.log( `the current temperature in ${location} is ${temp} and the weather is ${summary}`);
            console.log(` tommorows temperature will go between ${tommorowsLow} and${tommorowsHigh}`);
            console.log(location);

            res.render('weather',{
                title: `the current temperature in ${location} is ${temp} and the weather is ${summary}`,
                name: 'chipsili'
            })
            }
})
}
    })
})

app.listen(3000, () => {

        console.log('Server is up on port 3000.')
})
