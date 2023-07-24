import { db } from "../database/database";
import { UserDocumentReceived } from "../types/User";

export async function getUserByEmail(email: string) {
  const user = await db.collection("users").findOne({ email: email });
  return user as UserDocumentReceived;
}

export async function getUserByToken(token: string) {
  const user = await db.collection("users").findOne({ token: token });
  return user as UserDocumentReceived;
}

export async function postNewUser(name: string, email: string, password: string) {
  await db.collection("users").insertOne({
    name: name,
    email: email,
    password: password,
    createdAt: new Date(Date.now()),
  });
}

export async function postLoginUser(email: string, token: string) {
  await db.collection("users").updateOne({ email: email }, { $set: { lastLogin: new Date(Date.now()), token } });
}

export async function deleteUser(email: string) {
  await db.collection("users").deleteOne({ email: email });
}
