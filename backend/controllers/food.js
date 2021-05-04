const express = require('express')
const {getFoodFromUSDA, getFoodFromCassandra, saveFoodToCassandra} = require('../relay/food')
const food = express()
module.exports = food;

food.get('/', (req, res) => {
    res.send('Hello world from food controller')
})

// Sample IDs: 534358, 373052, 0076150232165

food.get('/:foodId/', async (req, res) => {
    const foodId = req.params.foodId

    if (foodId) {
        
        let result = await getFoodFromCassandra(foodId)

        if (result) {
            console.log(`cache hit on ${foodId}`);
            res.status(200).json(result)
            return
        }

        // else return 404 here

        else {
            res.status(404).json({
                ErrorMessage: "Item not found"
            })
            return
        }

    //     console.log(`cache miss on ${foodId}`);

    //     getFoodFromUSDA(foodId).then(data => {

    //         if (data) {

    //             let processed = {
    //                 foodId: data.gtinUpc,
    //                 name: data.description,
    //                 ingredients: data.ingredients,
    //                 servingSize: data.servingSize,
    //                 servingSizeUnit: data.servingSizeUnit,
    //                 labelNutrients: data.labelNutrients
    //             }
                
    //             Object.keys(processed.labelNutrients).forEach(nutrient => {
    //               processed.labelNutrients[nutrient] = processed.labelNutrients[nutrient].value
    //             })

    //             res.status(200).json(processed)
    //             saveFoodToCassandra(processed)
                
    //             return

    //        }
    //         else {
    //             res.status(404).json({
    //                 ErrorMessage: "Item not found"
    //             })
    //         }
    //     })
    }
    else {
        res.status(400).json({
            ErrorMessage: "foodId is required"
        })
    }
})
