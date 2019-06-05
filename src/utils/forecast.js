const request =require('request')

const forecast= (latitude,longitude,callback) => {
    const url='https://api.darksky.net/forecast/4bfb337274023f80bcb54f42e1e8fcb3/'+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)
    request({ url , json:true } ,(error,{body})=>{
        if(error){
                    callback('Unable to connect to weather service.',undefined)
                } else if(body.error){
                     callback('Unable to find location.',undefined)
                } else {
            callback(undefined,body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degrees out."+" There is a "+body.currently.precipProbability+"% chances of rain.")  
            }
        })    
    } 




module.exports=forecast