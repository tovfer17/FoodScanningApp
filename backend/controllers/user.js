const express = require('express')
const { getUserProfile, createUserProfile, getUserHistory, addToUserHistory } = require('../relay/user')
const user = express()
module.exports = user;

user.get('/', (req, res) => {
    res.send('Hello world from user controller')
})

// TODO: Build connections to relay to pull data for User transactions

/* User */

user.get('/:userId/profile/', async (req, res) => {
  let user = await getUserProfile(req.user.nickname)

  if (!!user) {
    return res.status(200).send(user)
  }

  let userData = {
    username: req.user.nickname,
    name: req.user.name,
    picture: req.user.picture,
    state: 'active',
    timestamp: Date.now()
  }

  const isUserCreated = await createUserProfile(userData)

  if (isUserCreated) {
    user = await getUserProfile(userData.username)
    return res.status(200).send(user)
  }

  return res.status(422).send({error: 'User was not found and could not be created, please contact the FoodScanningApp support team.'})

})

user.post('/profile/', (req, res) => {})

user.patch('/:userId/profile/', (req, res) => {})

/* Followers */

user.get('/:userId/followers/', (req, res) => {})

user.patch('/:userId/followers/', (req, res) => {})

user.delete('/:userId/followers/:otherUserId/', (req, res) => {})

/* Following */

user.get('/:userId/following/', (req, res) => {})

user.post('/:userId/following/', (req, res) => {})

user.delete('/:userId/following/:otherUserId/', (req, res) => {})

/* Favorites */

user.get('/:userId/favorites/:favoriteFolderNumber/', (req, res) => {})

user.post('/:userId/favorites/', (req, res) => {})

user.delete('/:userId/favorites/:favoriteFolderNumber/item/:foodId/', (req,res) => {})

/* History */

user.get('/:userId/history/', async (req, res) => {
  const username = req.user.nickname
  const history = await getUserHistory(username)

  return res.status(200).json(history)
})

user.post(`/:userId/history/add`, async (req, res) => {
  const username = req.user.nickname
  const foodId = req.body.foodId

  const history = await addToUserHistory(username, foodId)

  return res.status(200).json(history)
})

/* Calories */

user.get('/:userId/calorietracker/', (req, res) => {})

user.post('/:userId/calorietracker/', (req, res) => {})

user.get('/:userId/calorietracker/item/:calorieTrackerId/', (req, res) => {})

user.patch('/:userId/calorietracker/item/:calorietrackerId/', (req, res) => {})

user.delete('/:userId/calorietracker/item/:calorietrackerId/', (req, res) => {})