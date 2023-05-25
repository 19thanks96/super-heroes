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

app.post('/superheroes', upload.single('file'), createHero)

function createHero(req, res) {
    const superHero = {
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        catch_phrase: req.body.catch_phrase,
        images: [req.file.filename.replace(/\\/g, '/')],
    }
    database.createHero(superHero)
    res.json(superHero)
}
app.get('/superheroes', async (req, res) => {
    console.log('GET /superheroes')
    const heroes = await database.getAllHeroes()
    res.json(heroes)
})

app.get('/superheroes/:_id', async (req, res) => {
    console.log('/superheroes/:_id')
    const hero = await database.getHero(req.params._id)
    res.json(hero)
})

app.put('/superheroes/:_id', upload.single('file'), updateHero)

async function updateHero(req, res) {
    console.log('/superheroes/:_id')
    if(!req.body) return res.sendStatus(400);
    const superHero = {
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        catch_phrase: req.body.catch_phrase,
        images: [req.file.filename.replace(/\\/g, '/')],
    }
    const user = await database.updateHero(superHero, req.params._id)
    if(user) res.send(user);
    else res.sendStatus(404);
}

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
run().catch(console.error)
module.exports = app
process.on('SIGINT', async function () {
    await database.mongoClienter.close()
    process.exit()
})
