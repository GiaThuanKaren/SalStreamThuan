import { ShowToastify } from "./../index";
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";
export const uri =
  "mongodb+srv://salstream:salstream2002@cluster0.a6cyoli.mongodb.net/salstream?retryWrites=true&w=majority";

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // if (!global._mongoClientPromise) {
  //   client = new MongoClient(uri, options);
  //   global._mongoClientPromise = client.connect();
  // }
  // clientPromise = global._mongoClientPromise;
  client = new MongoClient(uri, options);
  clientPromise = client.connect();

  try {
    const collection = client.db("salstream").collection("comments");
    const changeStream = collection.watch();

    changeStream.on("change", (change) => {
      console.log("Change In Database ");

      ShowToastify("Change In Database");
      // Code to send notification
    });
    changeStream.on("error", (err) => {
      console.error("Change stream error:", err);
      ShowToastify("Change stream error");
    });

    changeStream.on("close", () => {
      console.log("Change stream closed.");
      ShowToastify("Change stream closed");
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.

export async function watchCollectionChange(
  databaseName: string,
  collectionName: string,
  HandleCallBack: () => any
) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db("salstream").collection(collectionName);
    const changeStream = collection.watch();
    // console.log(client.db.)
    changeStream.on("change", (change) => {
      console.log("Change In Database ");
      HandleCallBack();
      ShowToastify("Change In Database");
      // Code to send notification
    });
    changeStream.on("error", (err) => {
      console.error("Change stream error:", err);
      ShowToastify("Change stream error");
    });

    changeStream.on("close", () => {
      console.log("Change stream closed.");
      ShowToastify("Change stream closed");
    });
  } catch (err) {
    throw err;
    console.log(err);
  }
}

export async function RetriveUserInfo() {
  try {
    
  } catch (e) {}
}

export default clientPromise;
