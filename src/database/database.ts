import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL as string);

connectToDB()
async function connectToDB() {
  try {
    await mongoClient.connect();
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log(error.message);
  }
}
const db = mongoClient.db(process.env.DB_NAME);

export { db };
