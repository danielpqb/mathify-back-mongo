import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL as string);

async function connectToDB() {
  try {
    await mongoClient.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    console.log("Connection to MongoDB failed!");
  }
}
connectToDB();

const db = mongoClient.db(process.env.DB_NAME);

export { db };
