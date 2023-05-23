const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('zapros')
  res.json('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


module.exports = app