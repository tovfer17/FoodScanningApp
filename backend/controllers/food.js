const express = require('express')
const food = express()
module.exports = food;

food.get('/', (req, res) => {
    res.send('Hello world from food controller')
})

// TODO: Build connections to relay to pull data for Food transactions

food.get('/:foodId/',(req, res) => {})