import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Student Number: u21760022
dotenv.config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
let client;
let db;

async function connectDB() {
    const uri = process.env.MONGODB_URI;
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("camstack");
    console.log("Connected to MongoDB");
}

function getDB() {
    // TODO: Return the database
    return db;
}

export { connectDB, getDB };