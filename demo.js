const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://demo:*********@sp-training.uoozx.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();
        // await createListing(client, {
        //     name: "Lovely Loft",
        //     summary: "A charming loft in Paris",
        //     bedrooms: 1,
        //     bathrooms: 6
        // });

        // await createMultipleListings(client, [
        //     {
        //         name: "Nyc Loft",
        //         summary: "A loft in Nyc",
        //         bedrooms: 4,
        //         bathrooms: 1
        //     },
        //     {
        //         name: "Cleveland Loft",
        //         summary: "A loft in the land",
        //         bedrooms: 4,
        //         bathrooms:4543
        //     }
        // ]);



    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);
    console.log("New listing with the following id: " + result.insertedId);
    console.log(`${result.insertedCount} new Listings with the following Id(s): `);
    console.log(result.insertedIds);
}


async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .insertOne(newListing);

   
}

main().catch(console.error);

async function listDatabases(client) {
    const dbList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    dbList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}