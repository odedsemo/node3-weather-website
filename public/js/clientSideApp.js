const appForm = document.querySelector('form');
const appInput = document.querySelector('input');
const message1= document.querySelector('#message-1')
const message2= document.querySelector('#message-2')
const message3= document.querySelector('#message-3')
const message4= document.querySelector('#message-4')

let d = new Date()
let daysArr = document.getElementsByName('days')
let currentDayOfMonth = d.getDate();
console.log(daysArr);

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

   
//    request ({url: mapboxUrl, json: true}, (error, {body}) => {
//         if (error){
//             cb ('low level error, check internet connection', undefined)
//         }else if (body.features.length === 0){
//             cb ('invalid input, check address', undefined)
    
//         }else{
//             cb( undefined,
//                 {
//              lat : body.features[0].center[1],
//              long: body.features[0].center[0],   
//              location: body.features[0].place_name
//             })
//         }
//     })
//     }
    
    