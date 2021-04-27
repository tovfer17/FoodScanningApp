const express = require('express')
const {getFoodFromCassandra} = require('../relay/food')
const {listStoresFromGoogle,getStoreFromGoogleById} = require('../relay/store')
const store = express()
module.exports = store;

store.get('/', (req, res) => {
    res.send('Hello world from store controller')
})

// store.get('/:storeId/', (req,res) => {
//     let storeId = req.params.storeId

//     if (storeId) {
//         getStoreFromGoogleById(storeId).then((result) => {
//             console.log('store info - ' ,result);
//             if (result){
//                 res.status(200).json(result)
//             }
//             else{
//                 res.status(404).json({
//                     ErrorMessage: "Store not found"
//                 })
//             }
            
//         })
//     }
//     else {
//         res.status(400).json({
//             ErrorMessage: "storeId is required"
//         })
//     }
// })

store.get('/items/:foodId/',(req, res) => {
    let foodId = req.params.foodId
    let lat = req.query.lat
    let long = req.query.long

    if (foodId && lat && long) {

        let foodResult = getFoodFromCassandra(foodId)

        if (foodResult) {

            listStoresFromGoogle(foodResult.name, long, lat).then((storesResult) => {
                res.status(200).json(storesResult)
            })
        }
        else {
            res.status(404).json({
                ErrorMessage: "Food not found"
            })
        }

    }
    else {
        res.status(400).json({
            ErrorMessage: "foodId, long, and lat are required. E.g. /store/items/{foodId}/?long={longitude}&lat={latitude}"
        })
    }

})