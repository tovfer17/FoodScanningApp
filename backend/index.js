// root of server
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const user = require('./controllers/user')
const food = require('./controllers/food')
const store = require('./controllers/store')


app.get('/', (req, res) => {
    res.send('Hello world')
})

// add middleware for JWT validation (Authenticated Users)

app.use(express.json())
app.use('/user', user)
app.use('/food', food)
app.use('/store',store)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})