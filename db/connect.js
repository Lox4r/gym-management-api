const dns = require("node:dns/promises");
const { MongoClient } = require("mongodb");

let database;
let client;

const initDb = async (callback) => {
  if (database) {
    return callback(null, database);
  }

  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the environment variables.");
    }

    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    database = client.db("gymManagementAPI");

    console.log("Connected to MongoDB");

    callback(null, database);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    callback(error);
  }
};

const getDb = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

const closeDb = async () => {
  if (client) {
    await client.close();
    database = undefined;
    client = undefined;
  }
};

module.exports = {
  initDb,
  getDb,
  closeDb
};