const appForm = document.querySelector('form');
const appInput = document.querySelector('input');
const message1= document.querySelector('#message-1')
const message2= document.querySelector('#message-2')
const message3= document.querySelector('#message-3')
const message4= document.querySelector('#message-4')
const button= document.querySelector('#myButton')

let d = new Date()
let daysArr = document.getElementsByName('days')
let currentDayOfMonth = d.getDate();


for (i=0; i<7;i++){
    d.setDate(currentDayOfMonth + i)
    daysArr[i].innerHTML = d.toDateString();
    daysArr[i].value = i
   }

appForm.addEventListener('submit', (e) => {
          e.preventDefault();
                message1.textContent ='Loading...'
                message2.textContent = '' ;
                message3.textContent = '' ;
                message4.textContent = '' ;
   
fetch(`/weather?address=${appInput.value}`)
    .then((response) => {
        response.json()
        .then((data)=>{
            if (data.error){
                message1.textContent= data.error ;
                message2.textContent = '' ;
                message3.textContent = '' ;
                message4.textContent = '' ;
                 return
            }   
            let chosenDayValue = document.getElementById('day').value;
            let chosenDate = daysArr[chosenDayValue].innerHTML;
            let maxTemp = data.dailyForcasts[chosenDayValue].maxTemp;
            let minTemp = data.dailyForcasts[chosenDayValue].minTemp;
            let weather = data.dailyForcasts[chosenDayValue].summary;
            let location =data.location
            
            message1.textContent = chosenDate
            message2.textContent = location;
            message3.textContent= weather 
            message4.textContent = `Temperatures: ${maxTemp} - ${minTemp} celsius degrees`
        })
    })

      })
      /////////////////////////////////////////////////////////////////////////////////////////////////////////
      function getLocation () {
        if (!navigator.geolocation){
            message1.textContent = 'no navigator in browser'
            message2.textContent = ''
            message3.textContent= '' 
            message4.textContent = ``
        return
        }

        navigator.geolocation.getCurrentPosition(chipsilliPosition)

    }

    function chipsilliPosition (posi){
        let long = posi.coords.longitude;
        let lat = posi.coords.latitude;
        
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/906d2597a4c1c17eec9b60faeb781a22/${lat}, ${long}?units=si`)
          .then((res) => {
            return res.json()
            .then((weatherData) => {
                message1.textContent = `the current temperature on your location is ${weatherData.currently.temperature} celcius`;
                message2.textContent = ''
                message3.textContent= '' 
                message4.textContent = ``
             
     
            })
          })
      
      }
      button.addEventListener('click', (e) => {
        getLocation()      
 
})

   
    
    