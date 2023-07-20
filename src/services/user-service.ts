import { getUserByEmail, getUserByToken, postLoginUser, postNewUser } from "../repositories/user-repository";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { duplicatedEmailError, incorrectCredentialsError, userNotFoundError } from "../errors/user-error";

export async function checkIfEmailIsAvailable(email: string) {
  const user = await getUserByEmail(email);
  if (user) {
    throw duplicatedEmailError();
  }
}

export async function checkIfPasswordIsCorrect(email: string, password: string) {
  const user = await findUserByEmail(email);
  const isCorrect = bcrypt.compareSync(password, user.password);
  if (!isCorrect) {
    throw incorrectCredentialsError();
  }
}

export async function findUserByEmail(email: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw userNotFoundError();
  }
  return user;
}

export async function findUserByToken(token: string) {
  const user = await getUserByToken(token);
  if (!user) {
    throw userNotFoundError();
  }
  return user;
}

export async function createNewUser(name: string, email: string, password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);
  await postNewUser(name, email, passwordHash);
}

export async function createNewToken(email: string) {
  const token = uuid();
  await postLoginUser(email, token);
  return token;
}
