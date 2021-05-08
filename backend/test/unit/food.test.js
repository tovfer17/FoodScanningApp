const assert = require('assert')
const {getFoodFromCassandra,saveFoodToCassandra, cache} = require('../../relay/food')
const initCassandra = require('../../cassandra/init')

initCassandra(0)

describe('Cassandra Food Table', () => {
    it('Write To Happy Path', async () => {
        let result = await saveFoodToCassandra(cache[0])

        assert.ok(result === true, 'The item was not saved as expected')
    })

    it('Write To Negative Path', async () => {
        let result = await saveFoodToCassandra(null)

        assert.ok(result === false, 'The item was saved, and should not have')
    })
    
    it('Read From Happy Path', async () => {
        let foodItem = await getFoodFromCassandra('0076150232165')

        assert.ok(foodItem, 'The given foodId did not return a result as expected')
    })

    it('Read From Negative Path', async () => {
        let foodItem = await getFoodFromCassandra('0')

        assert.ok(foodItem == null, 'The given foodId returned a result, which was not expected')
    })
})