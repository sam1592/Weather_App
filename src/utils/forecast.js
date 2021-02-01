const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ce243e7127d606f301fd7c54400930d8&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback(error, undefined)
        } else if(body.error){
            callback('Location Not Found', undefined)
        } else {
            const { location, current } = body
            const { name, region } = location
            const { temperature, wind_speed, weather_descriptions, feelslike, humidity } = current
            callback(undefined, 
                'The current temp is ' + temperature + ' degrees' +
                ' in ' + name + ', ' + region +
                '. Also the wind speed is ' + wind_speed + ' and forecast is ' + weather_descriptions[0]
                + '. It feels like ' + feelslike + ' degrees and humidity is '
                + humidity + '.'
            )
        }
    })
}

module.exports = forecast