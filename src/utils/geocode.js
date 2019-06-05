const request =require('request')
const geocode= (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFnaGF2a2F1c2hpazciLCJhIjoiY2p3Y2tidmx2MHRrZDQzbXFpaG42ZTc5dyJ9.qDaZ4JyLgh2dZvqeyyNb_g&limit=1'

    request({url, json: true },(error,{body}) => {
      if(error) {
          callback('Unable to connect to location services')

      } else if(body.features.length===0){
          callback('Unable to find location.Try another search.',undefined)

      }else {
        callback(undefined,{
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location:  body.features[0].place_name

        })
      }            
    })
}
module.exports= geocode