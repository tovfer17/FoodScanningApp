const express = require('express')
const store = express()
module.exports = store;

store.get('/', (req, res) => {
    res.send('Hello world from store controller')
})

// TODO: Build connections to relay to pull data for Store transactions

store.get('/:storeId/', (req,res) => {})

store.get('/items/:foodId/',(req, res) => {})