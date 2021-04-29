const fetch = require('node-fetch')

/*Replace with call to table later*/
const cache = [
    {
        foodId: 534358,
        name: "NUT 'N BERRY MIX",
        ingredients: 'PEANUTS (PEANUTS, PEANUT AND/OR SUNFLOWER OIL). RAISINS. DRIED CRANBERRIES (CRANBERRIES, SUGAR, SUNFLOWER OIL). SUNFLOWER KERNELS AND ALMONDS (SUNFLOWER KERNELS AND ALMONDS, PEANUT AND/OR SUNFLOWER OIL).',
        servingSize: 28,
        servingSizeUnit: 'g',
        labelNutrients: {
          fat: { value: 8.9992 },
          saturatedFat: { value: 0.9996 },
          transFat: { value: 0 },
          cholesterol: { value: 0 },
          sodium: { value: 0 },
          carbohydrates: { value: 12.0008 },
          fiber: { value: 1.988 },
          sugars: { value: 7.9996 },
          protein: { value: 4.0012 },
          calcium: { value: 19.88 },
          iron: { value: 0.7196 },
          potassium: { value: 159.88 },
          calories: { value: 140 }
        }
    },
    {
        foodId: 373052,
        name: 'AGAVE NECTAR',
        ingredients: 'ORGANIC AGAVE. ',
        servingSize: 21,
        servingSizeUnit: 'g',
        labelNutrients: {
          fat: { value: 0 },
          sodium: { value: 0 },
          carbohydrates: { value: 15.9999 },
          sugars: { value: 14.0007 },
          protein: { value: 0 },
          calories: { value: 65.1 }
        }
      }
]

const getFoodFromCassandra = (foodId) => {
    for (c of cache){
        if (foodId == c.foodId){
            return c
        }
    }
}

const getFoodFromUSDA = async (foodId) => {
    let res = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.USDA_API_KEY}`)

    let data = await res.json()

    if (data && res.status === 200){
        return data
    }
    else {
        return null
    }
    
}

const saveFoodToCassandra = (food) => {
    if (food){
        /*Write to table*/
        return true
    }
    else {
        return false
    }
    
}

module.exports = {getFoodFromCassandra, getFoodFromUSDA, saveFoodToCassandra, cache};