const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017';
const mongoClient = new MongoClient(uri);

const users = [{name: "Bob", age: 35} , {name: "Alice", age: 21}, {name: "Tom", age: 45}];

async function run() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");
        const result = await collection.find().toArray();
        console.log(result);
        const newAge = await collection.findOneAndUpdate({name: 'Alice'}, {$set : {age : 23}})
        console.log(newAge)
        //const resultforOne = await collection.findOne({name: "Tom"});
        //console.log(resultforOne , 'one');
        //const results = await collection.find({name: "Tom"}).toArray();
        //console.log(results);
    }catch(err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }
}
run().catch(console.error);
module.exports = {client: mongoClient}