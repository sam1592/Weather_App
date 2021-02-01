const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ce243e7127d606f301fd7c54400930d8&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback(error, undefined)
        } else if(body.error){
            callback('Location Not Found', undefined)
        } else {
            const { current, location } = body
            callback(undefined, 
                'The current temp is ' + current.temperature + ' degrees' +
                ' in ' + location.name + ', ' + location.region
            )
        }
    })
}

module.exports = forecast