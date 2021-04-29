const assert = require('assert')
const {getFoodFromCassandra,saveFoodToCassandra, cache} = require('../../relay/food')

describe('Cassandra Food Table', () => {
    it('Read From Happy Path', () => {
        let foodItem = getFoodFromCassandra('534358')

        assert.ok(foodItem, 'The given foodId did not return a result as expected')
    })

    it('Read From Negative Path', () => {
        let foodItem = getFoodFromCassandra('0')

        assert.ok(foodItem == null, 'The given foodId returned a result, which was not expected')
    })

    it('Write To Happy Path', () => {
        let result = saveFoodToCassandra(cache[0])

        assert.ok(result === true, 'The item was not saved as expected')
    })

    it('Write To Negative Path', () => {
        let result = saveFoodToCassandra(null)

        assert.ok(result === false, 'The item was saved, and should not have')
    })
})