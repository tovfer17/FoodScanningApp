const { getFoodFromCassandra, getFoodFromNutritionix } = require('./food');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const getUserProfile = async (username) => {
  if (!!username) {
    const query = `SELECT * FROM users WHERE username = ?`

    try {
      const results = await db.execute(query, [ username ], {prepare: true})

      return results.first()
    } catch (e) {
      console.log(e)
    }
  }

  return false
}

const createUserProfile = async (user) => {
  if (!!user) {
    const query = `INSERT INTO users
                  (username, name, picture, state, timestamp) VALUES
                  (:username, :name, :picture, :state, :timestamp)`
    try {
      await db.execute(query, {...user}, {prepare: true})

      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  return false
}

const getUserHistory = async (username) => {
  if (!!username) {
    const query = `SELECT  history FROM users WHERE username = ?`

    try {
      const results = await db.execute(query, [ username ], {prepare: true})
      let history = results.first()

      history = !!history ? history.history : history

      if (!!history) {
        history = history.reverse();
        for (let [index, foodId] of history.entries()) {
          foodId = foodId.toString()
          let food = await getFoodFromCassandra(foodId)

          // console.log(food)
          if (!food) {
            food = await getFoodFromNutritionix(foodId)
            // console.log(food)
            if (!!food) {
              saveFoodToCassandra(food)
            }
          }
          history[index] = food
        }
      }

      return history
    } catch (e) {
      console.log(e)
    }
  }

  return false
}

const addToUserHistory = async (username, foodId) => {
  if (!!username) {
    let history = await getUserHistory(username)

    let query = `UPDATE users SET history = history + ? WHERE username = ?`

    try {
      let results = await db.execute(query, [ [foodId], username ], {prepare: true})

      if (results) {
        // 60 * 60 * 24 * 30
        query = `UPDATE users USING TTL ${60 * 10} SET history[${!!history ? history.length : 0}] = ? WHERE username = ?`
        await db.execute(query, [ foodId, username ], {prepare: true})
      }
      
      history = await getUserHistory(username)
      return history
    } catch (e) {
      console.log(e)
    }
  }

  return false
}

module.exports = { getUserProfile, createUserProfile, getUserHistory, addToUserHistory };