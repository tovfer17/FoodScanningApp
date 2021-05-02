const fetch = require('node-fetch')
const assert = require('assert')
const {getToken} = require('../../utilities/utility')

const url = 'http://localhost:3000/food'

describe('Get Food',() => {
    let access_token;

    before(async () => {
        //access_token = await getToken().catch(e => console.log('error - ', e))
    });

    it('Returns a 200', async () => {
        const res = await fetch(url+'/373052/', {
            headers: {
                'authorization': `Bearer ${access_token}`
            }
        })

        assert.strictEqual(res.status, 200, '200 OK not returned from food endpoint')

        const json = await res.json()

        assert.ok(json.foodId,'The returned object does not have an ID')
        assert.ok(json.name,'The returned object does not have a name')
        assert.ok(json.ingredients,'The returned object does not have ingredients')
        assert.ok(json.servingSize,'The returned object does not have a serving size')
        assert.ok(json.servingSizeUnit,'The returned object does not have a serving size unit')
        assert.ok(json.labelNutrients,'The returned object does not have a nutrients object')

    })
})