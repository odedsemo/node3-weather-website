const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 3000

//הגדרת משתנים של מסלולי הגישה  של אקספרסס לתיקיות 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templets/views')
const partialsPath = path.join(__dirname, '../templets/partials')

//הגדרת המודול 'הנדלברז' והמיקום של תיקיית ויוז (התיקייה שבה ממוקמים הטמפלטים)
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//הגדרת מיקום תיקיית הפרטיאלז
hbs.registerPartials(partialsPath)

// הגדרת המיקום של תיקיית הקבצים הסטטיים
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
        helpMessage: 'How can chipsili kipodet help you?',
        name: 'chipsili kipodet' 
    
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About chipsili',
        name: 'chipsili kipodet'
    })

})

app.get('/weather', (req, res) => {
if(!req.query.address){
    return res.send({
        error: 'no address provided'
    })
}
geocode(req.query.address, (error, {lat, long, location}={}) =>{
   if(error){
       return res.send({error})
   }
 forecast (lat ,long ,(error,data) => {
    if (error){
        return res.send({
            error: error,
        })
    }
       res.send({
        address: req.query.address,
        location, 
        
        dailyForcasts:[
            {
        summary: data.summary0,
        maxTemp: data.maxTemp0,
        minTemp: data.minTemp0, 
            },
            {
        summary:  data.summary1,
        maxTemp:  data.maxTemp1,
        minTemp1: data.minTemp1,
            },
            {
        summary:  data.summary2,
        maxTemp:  data.maxTemp2,
        minTemp:  data.minTemp2,
            },
            {
        summary: data.summary3,
        maxTemp: data.maxTemp3,
        minTemp: data.minTemp3,
            },
            {
        summary: data.summary4,
        maxTemp: data.maxTemp4,
        minTemp: data.minTemp4,
            },
            {
        summary: data.summary5,
        maxTemp: data.maxTemp5,
        minTemp: data.minTemp5,
            },
            {
        summary: data.summary6,
        maxTemp: data.maxTemp6,
        minTemp: data.minTemp6, 
            }
        ]
       
    })
})
})
})





app.listen(port, () => {

        console.log(`Server is up on port ${port}.`)
})
