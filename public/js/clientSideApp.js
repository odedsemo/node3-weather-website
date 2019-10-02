const appForm = document.querySelector('form');
const appInput = document.querySelector('input');
const message1= document.querySelector('#message-1')
const message2= document.querySelector('#message-2')

appForm.addEventListener('submit', (e) => {
          e.preventDefault();
message1.textContent ='Loading...'
    fetch(`/weather?address=${appInput.value}`)
    .then((response) => {
        response.json()
        .then((data)=>{
            if (data.error){
                message1.textContent= data.error ;
                message2.textContent= '' ;

                return
            }   
            message1.textContent= data.location;
            message2.textContent= data.forecast;
            
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
    
    