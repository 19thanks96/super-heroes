const express = require('express')
const multer = require('multer')
var bodyParser = require('body-parser')
var cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    },
})

const upload = multer({ storage: storage })

const superheroes = []

//app.post('/superheroes', (req, res) => {
//    superheroes.push(req.body)
//    console.log(superheroes)
//    res.json(req.body)
//})
app.post('/superheroes', upload.single('file'), uploadFiles)

function uploadFiles(req, res) {
    console.log(req.file)
    res.json({ message: 'Successfully uploaded files' })
}
app.get('/superheroes', (req, res) => {
    res.json(superheroes)
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app
