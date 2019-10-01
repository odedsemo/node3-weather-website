const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

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
 forecast (lat ,long ,(error,{temp,tommorowsHigh, tommorowsLow, summary}) => {
    if (error){
        return res.send({
            error: error,
        })
    }
       res.send({
        address: req.query.address,
        location,
        forecast: summary,
        temperature: temp,
        tommorowsHigh: tommorowsHigh,
        tommorowsLow: tommorowsLow,
    })
    })
})
})



app.listen(3000, () => {

        console.log('Server is up on port 3000.')
})
