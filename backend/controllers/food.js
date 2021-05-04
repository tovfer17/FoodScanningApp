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

        // else return 404 here

        console.log(`cache miss on ${foodId}`);

        getFoodFromNutritionix(foodId).then(data => {

            if (data) {

                let processed = {
                    foodId,
                    name: data.food_name,
                    ingredients: data.ingredients,
                    servingSize: data.serving_qty,
                    servingSizeUnit: data.serving_unit,
                    labelNutrients: {
                        'calories': data.nf_calories,
                        'fat': data.nf_total_fat,
                        'saturated fat': data.nf_saturated_fat,
                        'cholesterol': data.nf_cholesterol,
                        'sodium': data.nf_sodium,
                        'total_carbohydrate':data.nf_total_carbohydrate,
                        'dietary_fiber':data.nf_dietary_fiber,
                        'sugars':data.nf_sugars,
                        'protein':data.nf_protein,
                        'potassium':data.nf_potassium,
                        'photo':data.photo
                    }
                }
                
                // Object.keys(processed.labelNutrients).forEach(nutrient => {
                //   processed.labelNutrients[nutrient] = processed.labelNutrients[nutrient].value
                // })

                res.status(200).json(processed)
                // saveFoodToCassandra(processed)
                
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
