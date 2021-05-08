const fetch = require('node-fetch')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const getToken = async () => {
    let res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`,{
        method: 'POST',
        headers: { 
            'content-type': 'application/json' 
        },
        body: JSON.stringify({
            "client_id": process.env.AUTH0_CLIENT_ID,
            "client_secret": process.env.AUTH0_CLIENT_SECRET,
            "audience": process.env.AUTH0_API_IDENTIFIER,
            "grant_type":"client_credentials"
        })
    })

    let data = await res.json()

    return data.access_token
}

module.exports = {getToken, getFoodsFromUSDA}