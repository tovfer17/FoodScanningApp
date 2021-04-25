const express = require('express')
const {getFoodFromUSDA, getFoodFromCassandra, saveFoodToCassandra} = require('../relay/food')
const food = express()
module.exports = food;

food.get('/', (req, res) => {
    res.send('Hello world from food controller')
})

// Sample IDs: 534358, 373052

food.get('/:foodId/',(req, res) => {
    const foodId = req.params.foodId

    if (foodId) {
        
        let result = getFoodFromCassandra(foodId)

        if (result) {
            console.log(`cache hit on ${foodId}`);
            res.status(200).json(result)
            return
        }

        console.log(`cache miss on ${foodId}`);

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

                res.status(200).json(processed)
                saveFoodToCassandra(processed)
                
                return

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
