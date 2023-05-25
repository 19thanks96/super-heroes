const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017';
const mongoClienter = new MongoClient(uri);
let collection;

/*async function run() {
    try {
        await connectToSuperHeroes()
        //const resultforOne = await collection.findOne({name: "Tom"});
        //console.log(resultforOne , 'one');
        //const results = await collection.find({name: "Tom"}).toArray();
        //console.log(results);

        await createHero( user)
        //await updateHero( prev, update)
        await getAllHeroes()
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}*/
async function connectToSuperHeroes() {
    await mongoClienter.connect();
        const db = mongoClienter.db("allSuperHeroes");
        const collectionHero = db.collection("hero");
        collection = collectionHero
        return collectionHero
}
async function createHero( user) {
    console.log(user)
    const result = await collection.insertOne(user);
    console.log(result)
    return result
}

async function updateHero( prev, newHero) {
    const result = await collection.findOneAndUpdate(prev, {$set : newHero})
    console.log(result)
    return result
}
async function getAllHeroes() {
    const result = await collection.find().toArray();
    console.log(result);
    return result
}

async function getHero(it) {
    const resultforOne = await collection.findOne({"_id" : new ObjectId(it)});
    console.log(resultforOne , 'one');
    return resultforOne
}
//run().catch(console.error);
module.exports = { connectToSuperHeroes, updateHero, createHero, getAllHeroes, mongoClienter, getHero}