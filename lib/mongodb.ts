import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export default async function connectToDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI; // Ensure this is defined in your .env.local
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  const client = cachedClient || new MongoClient(uri);
  if (!cachedClient) {
    await client.connect();
    cachedClient = client;
  }

  cachedDb = client.db(); // Adjust the database name if needed
  return cachedDb;
}
