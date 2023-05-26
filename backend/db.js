const { MongoClient, ObjectId } = require('mongodb')
const fs = require('fs/promises')

// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017'
const mongoClienter = new MongoClient(uri)
let collection

/*async function run() {
    try {
        await connectToSuperHeroes()
        //const resultforOne = await collection.findOne({name: "Tom"});
        //console.log(resultforOne , 'one');
        //const results = await collection.find({name: "Tom"}).toArray();
        //console.log(results);

        await createHero( hero)
        //await updateHero( prev, update)
        await getAllHeroes()
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}*/
async function connectToSuperHeroes() {
    await mongoClienter.connect()
    const db = mongoClienter.db('SuperHeroesdb')
    const collectionHero = db.collection('hero')
    collection = collectionHero
    return collectionHero
}
async function createHero(hero) {
    const result = await collection.insertOne(hero)

    return result
}

async function updateHero(newHero, id, images) {
    const newid = new ObjectId(id)
    const hero = await collection.findOne({ _id: newid })
    newHero.images = hero.images.concat(images)
    const result = await collection.findOneAndUpdate(
        { _id: newid },
        { $set: newHero },
        { returnDocument: 'after' }
    ) 
    return result.value
}


const pageSize = 5
async function getAllHeroes(page) {
    const result = await collection.find().skip((page-1)*pageSize).limit(pageSize).toArray()
    return result
}

async function deleteHero(id) {
    const objectId = new ObjectId(id)
    const hero = await collection.findOne({ _id: objectId })
    for (const img of hero.images) {
        await deleteImgFile(img)
    }
    const result = await collection.findOneAndDelete({ _id: objectId })
    return result
}

async function deleteHeroImg(id, fileName) {
    const newid = new ObjectId(id)
    const hero = await collection.findOne({ _id: newid })
    const newImages = hero.images.filter((img) => {
        return img !== fileName
    })
    const result = await collection.findOneAndUpdate(
        { _id: newid },
        { $set: {images: newImages} },
        { returnDocument: 'after' }
        )
        await deleteImgFile(fileName)
        return result.value
}

async function deleteImgFile(fileName) {
    console.log('Deleting file: ',fileName)
    return await fs.unlink('./uploads/' + fileName)
}

async function getHero(it) {
    const resultforOne = await collection.findOne({ _id: new ObjectId(it) })
    return resultforOne
}

async function getHeroesCount() {
    const count = await collection.count()
    console.log(count)
    return count
}

//run().catch(console.error);
module.exports = {
    connectToSuperHeroes,
    updateHero,
    createHero,
    getAllHeroes,
    mongoClienter,
    getHero,
    deleteHero,
    getHeroesCount,
    deleteHeroImg,
    pageSize
}
