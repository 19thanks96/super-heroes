const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

const superheroes = []

app.get('/', (req, res) => {
  console.log('zapros')
  res.json('Hello World!')
})

app.post('/superheroes', (req, res) => {
    superheroes.push(req.body) 
    res.json(req.body)
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}



module.exports = app
