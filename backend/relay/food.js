const fetch = require('node-fetch')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cache = [
{
  foodId: '0076150232165',
  name: 'Movie Theater Butter Popcorn',
  ingredients: 'popping corn, palm oil, salt, less than 2% of: butter, natural flavoring, color added, tbhq and citric acid (for freshness).',
  servingSize: 2,
  servingSizeUnit: 'tbsp unpopped',
  labelNutrients: {
    calories: 150,
    fat: 8,
    saturatedFat: 4,
    cholesterol: 0,
    sodium: 370,
    carbohydrates: 19,
    fiber: 3,
    sugars: null,
    protein: 2,
    potassium: 60,
  },
  photo: 'https://nutritionix-api.s3.amazonaws.com/546a0e812bc0b27b2a676d01.jpeg'
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

const getFoodFromNutritionix = async (foodId) => {
  try {
   //let res = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${process.env.USDA_API_KEY}`)

    let res = await fetch(`https://trackapi.nutritionix.com/v2/search/item?upc=${foodId}`,{
      headers: {
        "x-app-id": process.env.NUTRITIONIX_APP_ID,
        "x-app-key": process.env.NUTRITIONIX_APP_KEY
      }
    })


    let data = await res.json()

    //console.log('RELAY - ',res,data);

    if (data && res.status === 200){
      return data.foods[0] //data
    }
    else {
      return null
    }
  } catch (error) {
    console.log("Error", error)
    return null
  }
    
}

const saveFoodToCassandra = async (food) => {
    if (food){
        /*Write to table*/

        const query = `INSERT INTO foods \
                      ("foodId", name, ingredients, serving_size, serving_size_unit, label_nutrients, photo) VALUES \
                      (:foodId, :name, :ingredients, :servingSize, :servingSizeUnit, :labelNutrients, :photo) \
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

module.exports = {getFoodFromCassandra, getFoodFromNutritionix, saveFoodToCassandra, cache};