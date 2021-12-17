const { MongoClient } = require('mongodb');
const db = "sample_airbnb";
const collection = "listingsAndReviews";
async function main() {
    const uri = "mongodb+srv://demo:xx@sp-training.uoozx.mongodb.net/?retryWrites=true&w=majority";

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
        //await findListingByName(client, "Cleveland Loft");
        await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, { minimumNumberOfBedrooms: 3, minimumNumberOfBedrooms: 2, maximumNumberOfResults: 5 });


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function createMultipleListings(client, newListings) {
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

async function findListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`Could not find any results`);
    }
}

async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(
    client, {
        minimumNumberOfBedrooms = 0,
        minimumNumberOfBathrooms = 0,
        maximumNumberOfResults = Number.MAX_SAFE_INTEGER
    } = {}) {
    const cursor = await client.db(db).collection(collection).find({
        bedrooms: { $gte: minimumNumberOfBedrooms },
        bathrooms: { $gte: minimumNumberOfBathrooms }
    }).sort({ last_review: -1 })
        .limit(maximumNumberOfResults);

    const result = await cursor.toArray();
    console.log(result);
}

async function listDatabases(client) {
    const dbList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    dbList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}