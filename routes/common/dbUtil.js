const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_DB_URL);

var dbUtils = {
    async getMongodbConnection(userInput, queryType) {
        // Use connect method to connect to the server
        await client.connect(); // 15sec
        console.log('Connected successfully to server - from common file');
        const db = client.db(process.env.Mongo_DB_Name);
        switch (queryType) {
            case 'find':
                var collection = db.collection('userAccountDetails');
                return collection.find({accountId: userInput.accountId}).toArray();
                break;
            case 'findProduct':
                var query = {};
                if (Object.keys(userInput).length) { // object is not empty
                    if (userInput.category) {
                        query = {category: {$in: userInput.category}}
                    }
                    if (userInput.priceRange) {
                        query.price = {$lt: parseInt(userInput.priceRange)};
                    }
                    if (userInput.id) {
                        query.id = parseInt(userInput.id);
                    }
                }
                var collection = db.collection('productDetails');
                return collection.find(query).toArray();
                break;
            case 'newSignup':
                var collection = db.collection('userAccountDetails');
                return collection.insertOne(userInput);
                break;
            case 'addProduct':
                console.log(userInput);
                var collection = db.collection('productDetails');
                return collection.insertOne(userInput);
                break;

        }
    }
}

module.exports = dbUtils;