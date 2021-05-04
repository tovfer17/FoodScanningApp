const fetch = require('node-fetch')

const cache = [
  {
      foodId: 534358,
      name: "NUT 'N BERRY MIX",
      ingredients: 'PEANUTS (PEANUTS, PEANUT AND/OR SUNFLOWER OIL). RAISINS. DRIED CRANBERRIES (CRANBERRIES, SUGAR, SUNFLOWER OIL). SUNFLOWER KERNELS AND ALMONDS (SUNFLOWER KERNELS AND ALMONDS, PEANUT AND/OR SUNFLOWER OIL).',
      servingSize: 28,
      servingSizeUnit: 'g',
      labelNutrients: {
        fat: 8.9992,
        saturatedFat: 0.9996,
        transFat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 12.0008,
        fiber: 1.988,
        sugars: 7.9996,
        protein: 4.0012,
        calcium: 19.88,
        iron: 0.7196,
        potassium: 159.88,
        calories: 140
      }
  },
  {
      foodId: 373052,
      name: 'AGAVE NECTAR',
      ingredients: 'ORGANIC AGAVE. ',
      servingSize: 21,
      servingSizeUnit: 'g',
      labelNutrients: {
        fat: 0,
        sodium: 0,
        carbohydrates: 15.9999,
        sugars: 14.0007,
        protein: 0,
        calories: 65.1
      }
    }
]

const getFoodFromCassandra = async (foodId) => {
  const query = `SELECT * FROM foods WHERE "foodId" = ?`

  try {
    const results = await db.execute(query, [ foodId ], {prepare: true})

    return results.first()
  } catch (e) {
    console.log(e)
  }
}

const getFoodFromUSDA = async (foodId) => {
  try {
   let res = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.USDA_API_KEY}`)

    // let res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.USDA_API_KEY}&dataType=Foundation,SR%20Legacy,Branded,Survey&query=${foodId}`)

    //let res = await fetch(`https://api.upcdatabase.org/product/${foodId}`)

    let data = await res.json()

    console.log('RELAY - ',res,data);

    if (data && res.status === 200){
      return data.foods //data
    }
    else {
      return null
    }
  } catch (error) {
    console.log("USDA Request Error", error)
    return null
  }
    
}

const saveFoodToCassandra = async (food) => {
    if (food){
        /*Write to table*/

        const query = `INSERT INTO foods \
                      ("foodId", name, ingredients, serving_size, serving_size_unit, label_nutrients) VALUES \
                      (:foodId, :name, :ingredients, :servingSize, :servingSizeUnit, :labelNutrients) \
                      USING TTL ${60 * 1}`
        try {
          await db.execute(query, {...food}, {prepare: true})

          return true
        } catch (e) {
          console.log(e)
          return false
        }
    }
    else {
        return false
    }
    
}

module.exports = {getFoodFromCassandra, getFoodFromUSDA, saveFoodToCassandra, cache};