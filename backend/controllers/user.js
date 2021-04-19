const express = require('express')
const user = express()
module.exports = user;

user.get('/', (req, res) => {
    res.send('Hello world from user controller')
})

// TODO: Build connections to relay to pull data for User transactions

/* User */

user.get('/:userId/profile/', (req, res) => {})

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

/* Calories */

user.get('/:userId/calorietracker/', (req, res) => {})

user.post('/:userId/calorietracker/', (req, res) => {})

user.get('/:userId/calorietracker/item/:calorieTrackerId/', (req, res) => {})

user.patch('/:userId/calorietracker/item/:calorietrackerId/', (req, res) => {})

user.delete('/:userId/calorietracker/item/:calorietrackerId/', (req, res) => {})