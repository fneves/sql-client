const { Pool } = require('pg')
const pgMetadata = require('pg-metadata')
const parsePgConnectionString = require('pg-connection-string').parse;
var express = require('express');
const { response } = require('express');
var router = express.Router();


const connections = {}

router.post("/login", function(req, res, next) {
  res.send({ user: {
    email: req.email,
    name: req.email
  }})
})

router.post("/connect", function(req, res){
  const connectionString = req.body.connectionString
  const id = Math.random().toString(36).substr(2, 9)

  try {
    const pool = new Pool({connectionString })
    pool.query('SELECT NOW()', (err, result) => {
      if(err) {

        res.status(400).send({ error: `could not connect to database: ${err.stack.split("\n")[0]}`})

      } else {

        connections[id] = {
          connectionString: connectionString,
          connection: pool
        }

        res.send({
          id: id,
          connectionString: connectionString
        })
      }
    })
  } catch(error) {
    response.status(400).send({ error: error.message })
  }
})

router.post("/tables", function(req, res){
  const storedConnection = connections[req.body.connection]
  const config = parsePgConnectionString(storedConnection.connectionString)
  const connection = storedConnection.connection

  pgMetadata(connection, /* { table: 'tableName', schema: 'schemaName', database: 'databaseName' } */
    function(err, metadata) {

      if(err) {
        res.status(400).send({error: err})
      } else {
        const publicSchema = metadata[config.database].public
        let tables = Object.keys(publicSchema).map(tableName => {

          const tableColumns = publicSchema[tableName]
          return {
            name: tableName,
            columns: Object.keys(tableColumns).map(column => {
              return  {
                name: column,
                ...tableColumns[column]
              }
            })
          }
        })

        res.send({
          tables: tables
        })
      }
    }
  )

})

router.post("/execute", function(req, resp) {
  const connectionId = req.body.connectionId
  const query        = req.body.query

  let connection = connections[connectionId]

  console.dir(connection)

  res.send({
    status: "ok",
    results: []
  })
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

module.exports = router;
