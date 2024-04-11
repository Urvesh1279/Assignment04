const { MongoClient, ObjectId } = require('mongodb');

const URI = "mongodb://localhost:27017";

//Database Connected
async function getmongodbconnect() {
    try {
        const client = new MongoClient(URI);
        await client.connect();
        console.log("MongoDb Successfully Connected");

        return client;
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw error;
    }
}


//All Data Show
async function showalldata() {

    const client = await getmongodbconnect();
    const Database = client.db("Online_Shopping_App");
    const collection = Database.collection("Product");

    try {

        const data = await collection.find({}).toArray();
        console.log("Data Recevied", data);
        return data
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error;
    }
    finally {
        client.close();
    }


}

showalldata()


//Specific Data Updation
async function updateprice(productId, newPrice) {
    const client = await getmongodbconnect();
    const database = client.db("Online_Shopping_App");
    const collection = database.collection("Product");

    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(productId) },
            { $set: { price: newPrice } }
        );
        console.log(`${result.modifiedCount} product(s) updated.`);
    } catch (error) {
        console.error("Error updating product price:", error);
    } finally {
        await client.close();
        console.log("Connection to MongoDB closed.");
    }
}
    updateprice("661782632fbf2f6bb0be5eef",10000)

//Specific Object Delete

async function deleteDocument(deletedata) {

    const client = await getmongodbconnect();
    const database = client.db("Online_Shopping_App");
    const collection = database.collection("Product");



    try {
        const result = await collection.deleteOne(
            { _id: new ObjectId(deletedata) },
        );
        console.log(`${result.deletedCount} document(s) deleted.`);
    } catch (error) {
        console.error("Error deleting document:", error);
    } finally {
        await client.close();
        console.log("Connection to MongoDB closed.");
    }
}
// deleteDocument()

// Collection Delete
async function deleteCollection() {
    const client = new MongoClient(URI);

    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        const database = client.db("Online_Shopping_App");
        const collection = database.collection("Product");

        const result = await collection.drop();
        console.log("Collection dropped:", result);
    } catch (error) {
        console.error("Error deleting collection:", error);
    } finally {
        await client.close();
        console.log("Connection to MongoDB closed.");
    }
}
// deleteCollection()
