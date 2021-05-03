const cassandra = require('cassandra-driver')

global.db = new cassandra.Client({
  contactPoints: ['foodscanningdb'],
  localDataCenter: 'datacenter1',
  keyspace: ['foodscanning'],
  credentials: { username: "cassandra", password: "cassandra" },
})

module.exports = function initCassandra(delay) {
  console.log(`Waiting, ${delay} seconds to allow Cassandra container to complete setup`)
  setTimeout(function () {
    db.connect()
      .then(() => {
        console.log("Connected to Cassandra.")
      })
      .catch(e => {
      console.log(e)
      console.log("Could not connect to Cassandra, please make sure the database is running and restart the server.")
    })
  }, delay * 1000)
}

//