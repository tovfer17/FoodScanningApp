const fetch = require('node-fetch')
const express = require('express')
const food = express()
module.exports = food;

food.get('/', (req, res) => {
    res.send('Hello world from food controller')
})

// Sample IDs: 534358, 373052

food.get('/:foodId/',(req, res) => {
    const foodId = req.params.foodId

    if (foodId) {

        // TODO: first check Cassandra to see if cached.
        
        getFoodFromUSDA(foodId).then(data => {

            if (data) {

            let processed = {
                foodId: data.fdcId,
                name: data.description,
                ingredients: data.ingredients,
                servingSize: data.servingSize,
                servingSizeUnit: data.servingSizeUnit,
                labelNutrients: data.labelNutrients
            }

            // TODO: cache in Cassandra

            res.status(200).json(processed)

            }
            else {
                res.status(404).json({
                    ErrorMessage: "Item not found"
                })
            }
        })
    }
    else {
        res.status(400).json({
            ErrorMessage: "foodId is required"
        })
    }
})

const getFoodFromUSDA = async (foodId) => {
    let res = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.USDA_API_KEY}`)

    let data = await res.json()

    //const json = JSON.parse(data)

    if (data && res.status === 200){
        return data
    }
    else {
        return null
    }
    
}
