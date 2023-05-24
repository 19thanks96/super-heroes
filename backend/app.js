const express = require('express')
const multer = require('multer')
var bodyParser = require('body-parser')
var cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 4000

app.use(express.static('uploads'))

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
    console.log(req.body)
    console.log(req.file)
    const superHero = {
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        catch_phrase: req.body.catch_phrase,
        images:[ req.file.filename.replace(/\\/g, "/")],
    }
    superheroes.push(superHero)
    res.json(superHero)
}
app.get('/superheroes', (req, res) => {
    res.json(superheroes)
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}
app.get('/superheroes/:nickname', (req, res) => {
    console.log(req.params.nickname, 'req.params.nickname')
    const hero = superheroes.find((e) => {
        console.log(e.nickname)
        return e.nickname === req.params.nickname
    })
    console.log(superheroes)
    console.log(hero, 'hero')

    res.json(hero)
})
//searchhero
module.exports = app
