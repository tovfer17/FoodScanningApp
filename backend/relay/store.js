const fetch = require('node-fetch')
const store = require('../controllers/store')

//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJrTLr-GyuEmsRBfy61i59si0&key=YOUR_API_KEY
const getStoreFromGoogleById = async (storeId) => {}

//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY
const listStoresFromGoogle = async (name,long, lat) => {}


module.exports = {getStoreFromGoogleById, listStoresFromGoogle}