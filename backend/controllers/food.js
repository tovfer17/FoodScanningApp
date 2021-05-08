const express = require('express')
const {getFoodFromNutritionix, getFoodFromCassandra, saveFoodToCassandra} = require('../relay/food')
const food = express()
module.exports = food;

food.get('/', (req, res) => {
    res.send('Hello world from food controller')
})

// Sample IDs: 0076150232165

food.get('/:foodId/', async (req, res) => {
    const foodId = req.params.foodId

    if (foodId) {
        
        let result = await getFoodFromCassandra(foodId)

        if (result) {
            console.log(`cache hit on ${foodId}`);
            res.status(200).json(result)
            return
        }

        console.log(`cache miss on ${foodId}`);

        result = await getFoodFromNutritionix(foodId)

        if (result) {

            res.status(200).json(result)
            saveFoodToCassandra(result)
            return
        }
        else {
            res.status(404).json({
                ErrorMessage: "Item not found"
            })
        }
    }
    else {
        res.status(400).json({
            ErrorMessage: "foodId is required"
        })
    }
})
