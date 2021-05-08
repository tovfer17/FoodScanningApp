const fetch = require('node-fetch')
const assert = require('assert')
const {getToken} = require('../../utilities/utility')

const url = 'http://localhost:3000/store'

describe('List Store Items',() => {
    let access_token;

    before(async () => {
        //access_token = await getToken().catch(e => console.log('error - ', e))
    });

    /*Commented out since it calls a 3rd party*/
    // it('Returns a 200', async () => {
    //     const res = await fetch(url+'/items/373052/?lat=40.7128&long=-74.0060',{
    //        headers: {
    //            'authorization': `Bearer ${access_token}`
    //        }
    //    })

    //     assert.strictEqual(res.status, 200, '200 OK not returned from list stores endpoint')

    //     const json = await res.json()

    //     const store = json[0]

    //     assert.ok(store.formatted_address,'The returned object does not have an Address')
    //     assert.ok(store.geometry,'The returned object does not have a GPS information')
    //     assert.ok(store.name,'The returned object does not have the store name')
    //     assert.ok(store.opening_hours,'The returned object does not have opening hours')
    //     assert.ok(store.photos,'The returned object does not have a photo object')
    //     assert.ok(store.place_id,'The returned object does not have a photo object')
    // })

    it('Returns a 400', async () => {
        const res = await fetch(url+'/items/373052/?long=-74.0060',{
            headers: {
                'authorization': `Bearer ${access_token}`
            }
        })

        assert.strictEqual(res.status, 400, '400 Bad Request not returned from list stores endpoint')

        const json = await res.json()
        assert.strictEqual(json.ErrorMessage, 'foodId, long, and lat are required. E.g. /store/items/{foodId}/?long={longitude}&lat={latitude}', 'The Error Message does not match as expected')
    })

    it('Returns a 404', async () => {
        const res = await fetch(url+'/items/0/?lat=40.7128&long=-74.0060', {
            headers: {
                'authorization': `Bearer ${access_token}`
            }
        })

        assert.strictEqual(res.status, 404, '404 Not Found not returned from list stores endpoint')

        const json = await res.json()
        assert.strictEqual(json.ErrorMessage, 'Food not found')
    })
})