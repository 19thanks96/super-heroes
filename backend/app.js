const express = require('express')
const multer = require('multer')
var bodyParser = require('body-parser')
var cors = require('cors')
const fs = require('fs/promises')
const path = require('path')
const database = require('./db')
const { existsSync } = require('fs')
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

app.post('/superheroes', upload.any('files'), createHero)

function createHero(req, res) {
    console.log(req.files)
    const superHero = {
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        catch_phrase: req.body.catch_phrase,
        images: req.files.map((file) => file.filename),
    }
    database.createHero(superHero)
    res.json(superHero)
}
app.get('/superheroes', async (req, res) => {
    console.log('GET /superheroes')
    const page = Number(req.query.page)
    const heroes = await database.getAllHeroes(page)
    const totalCount = await database.getHeroesCount()
    const pageSize = database.pageSize
    res.json({ heroes, totalCount, pageSize })
})

app.get('/superheroes/:_id', async (req, res) => {
    console.log('GET /superheroes/:_id')
    const hero = await database.getHero(req.params._id)
    res.json(hero)
})

app.put('/superheroes/:_id', upload.any('files'), updateHero)

async function updateHero(req, res) {
    console.log('PUT /superheroes/:_id')
    if (!req.body) return res.sendStatus(400)
    const superHero = {
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        catch_phrase: req.body.catch_phrase,
    }
    let images = []
    if (req.files) {
        images = req.files.map((file) => file.filename)
    }
    const hero = await database.updateHero(superHero, req.params._id, images)
    if (hero) res.send(hero)
    else res.sendStatus(404)
}

app.delete('/superheroes/:_id', async (req, res) => {
    console.log('DELETE /superheroes/:_id')
    const hero = await database.deleteHero(req.params._id)
    if (hero) res.send(hero)
    else res.sendStatus(404)
})

app.delete('/superheroes/:_id/image/:fileName', async (req, res) => {
    console.log('DELETE /superheroes/:_id/image/:fileName')
    const hero = await database.deleteHeroImg(
        req.params._id,
        req.params.fileName
    )
    if (hero) res.send(hero)
    else res.sendStatus(404)
})

async function createDirectory() {
    try {
        await fs.mkdir('uploads')
        console.log('uploads directory created')
    } catch {
        console.log('uploads directory exist')
    }
}

async function run() {
    try {
        await createDirectory()
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
