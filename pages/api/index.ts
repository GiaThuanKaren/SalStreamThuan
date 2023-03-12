import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { uri } from "src/utils/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client;
  let clientPromise: Promise<MongoClient>;
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
  const collections = client.db().listCollections().toArray();

  res.status(200).send(collections);
}
