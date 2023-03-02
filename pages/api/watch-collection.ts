import { ShowToastify } from "./../../src/utils/index";
// pages/api/watch-collection.js
import { ChangeStreamDocument, MongoClient } from "mongodb";
import { uri } from "src/utils/lib/mongodb";

let db;
let client: any;

async function connectToDatabase() {
  if (client && client.isConnected()) {
    return client;
  }

  client = new MongoClient(uri, {});

  await client.connect();
  db = client.db("salstream");

  return client;
}
