const express = require('express')
const multer = require('multer')
var bodyParser = require('body-parser')
var cors = require('cors')
const fs = require('fs')
const path = require('path')
const database = require('./db')
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
        images: [req.file.filename.replace(/\\/g, '/')],
    }
    superheroes.push(superHero)
    database.createHero(superHero)
    res.json(superHero)
}
app.get('/superheroes', async (req, res) => {
    console.log('GET /superheroes')
    const heroes =  await database.getAllHeroes()
    res.json(heroes)
})

app.get('/superheroes/:_id', async (req, res) => {
    console.log(req.params._id, 'req.params._id')
    const hero = await database.getHero(req.params._id)
    console.log(hero, 'hero')

    res.json(hero)
})

async function run() {
    try {
        await database.connectToSuperHeroes()
        if (process.env.NODE_ENV !== 'test') {
            app.listen(port, () => console.log(`Listening on port ${port}`))
        }
    } catch (err) {
        console.log(err)
    } finally {
        
    }
}
run().catch(console.error);
module.exports = app
process.on('SIGINT', async function() {await database.mongoClienter.close()})