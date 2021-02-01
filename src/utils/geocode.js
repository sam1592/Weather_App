const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
    '.json?access_token=pk.eyJ1Ijoic25zaGV0aDU1IiwiYSI6ImNra2g0cHpzOTBsenUydW53cXN1amg5em0ifQ.fDl8T4tu7s4oEkwHPyVSUA&limit=1'
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback(error, undefined)
        } else if(body.features.length === 0){
            callback('No Locations Found', undefined)
        } else {
            const { features } = body
            const { center, place_name:location } = features[0]
            const [longitude, latitude] = center
            callback(undefined, {
                longitude,
                latitude,
                location
            })
        }
    })
}

module.exports = geocode