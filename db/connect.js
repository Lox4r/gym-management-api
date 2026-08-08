const dns = require("node:dns/promises");
const { MongoClient } = require("mongodb");

// Apply DNS workaround before MongoDB connections are created.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let database;
let client;

const initDb = async (callback) => {
  if (database) {
    return callback(null, database);
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing.");
    }

    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();

    database = client.db("gymManagementAPI");

    console.log("Connected to MongoDB");

    return callback(null, database);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return callback(error);
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
    client = undefined;
    database = undefined;
  }
};

module.exports = {
  initDb,
  getDb,
  closeDb
};