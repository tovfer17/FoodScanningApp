const fetch = require('node-fetch')
const store = require('../controllers/store')

const cache = []

const getStoreFromGoogleById = async (storeId) => {
    let res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${storeId}&key=${process.env.GOOGLE_API_KEY}`)

    let data = await res.json()

    if (data && res.status === 200){
        return data
    }
    else {
        return null
    }
}

const listStoresFromGoogle = async (name, long, lat, radius=2000) => {
    let encoded_name = encodeURI(name)
    let res = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encoded_name}&inputtype=textquery&fields=photos,formatted_address,geometry,name,opening_hours,place_id&locationbias=circle:${radius}@${lat},${long}&key=${process.env.GOOGLE_API_KEY}`)

    let data = await res.json()

    if (data && res.status === 200){
        return data.candidates
    }
    else {
        return null
    }
}

const listStoresFromGoogle2 = async (name, long, lat, radius=2000) => {
    let encoded_name = encodeURI('where to buy '+name)
    let res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encoded_name}&fields=photos,formatted_address,geometry,name,opening_hours,place_id&location=${lat},${long}&radius=${radius}&key=${process.env.GOOGLE_API_KEY}`)

    let data = await res.json()

    if (data && res.status === 200){
        return data.results
    }
    else {
        return null
    }
}


module.exports = {getStoreFromGoogleById, listStoresFromGoogle, listStoresFromGoogle2}