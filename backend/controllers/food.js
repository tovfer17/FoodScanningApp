const fetch = require('node-fetch')
const express = require('express')
const food = express()
module.exports = food;

food.get('/', (req, res) => {
    res.send('Hello world from food controller')
})

// TODO: Build connections to relay to pull data for Food transactions

// Sample ID: 534358

food.get('/:foodId/',(req, res) => {
    const foodId = req.params.foodId

    if (foodId) {

        // TODO: first check Cassandra to see if cached.
        
        getFoodFromUSDA(foodId).then(data => {

            if (data) {
            console.log('type -',typeof(data),'data - ',data)

            let processed = {
                foodId: data.fdcId,
                name: data.description,
                ingredients: data.ingredients,
                servingSize: data.servingSize,
                servingSizeUnit: data.servingSizeUnit,
                labelNutrients: data.labelNutrients
            }

            // TODO: save to Cassandra for next call

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

    //console.log('usda - ',data);

    //const json = JSON.parse(data)

    // if not found, return null
    if (data){
        return data
    }
    else {
        return null
    }
    
}
