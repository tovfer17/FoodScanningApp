// root of server
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const app = express()
const port = process.env.PORT || 3000
const user = require('./controllers/user')
const food = require('./controllers/food')
const store = require('./controllers/store')
const initCassandra = require('./cassandra/init.js')

initCassandra(15)

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    // audience: process.env.AUTH0_API_IDENTIFIER,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

app.get('/', (req, res) => {
    res.send('Hello world')
})

// comment out for now
app.use(checkJwt);

app.use(express.json())

try {
  app.use('/user', user)
  app.use('/food', food)
  app.use('/store',store)
}
catch (e) {
  console.error('Server Error - ',e);
  app.get('*',(req, res) => {
    res.status(500).json({
      ErrorMessage: 'Something went wrong'
    })
  })
}



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})