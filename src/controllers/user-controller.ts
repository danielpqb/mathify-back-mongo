import { Request, Response } from "express";
import {
  checkIfEmailIsAvailable,
  checkIfPasswordIsCorrect,
  createNewToken,
  createNewUser,
  findUserByEmail,
  removeUser,
} from "../services/user-service";
import { AuthenticatedRequest, UserDocument } from "../types/User";
import { incorrectCredentialsError } from "../errors/user-error";

export async function signUp(req: Request, res: Response) {
  await checkIfEmailIsAvailable(req.body.email);
  await createNewUser(req.body.name, req.body.email, req.body.password);
  return res.status(201).send({ message: "User created successfully." });
}

export async function signIn(req: Request, res: Response) {
  const user = await findUserByEmail(req.body.email);
  await checkIfPasswordIsCorrect(req.body.email, req.body.password);
  const token = await createNewToken(req.body.email);
  return res.status(200).send({
    message: "You are loged in.",
    token,
    email: user.email,
    name: user.name,
  });
}

export async function getUserByToken(req: AuthenticatedRequest, res: Response) {
  const user = req.user as UserDocument;
  return res.status(200).send({
    message: "User found with token.",
    email: user.email,
    name: user.name,
  });
}

export async function unregisterUser(req: AuthenticatedRequest, res: Response) {
  const user = req.user as UserDocument;
  if (user.email !== req.body.email) {
    throw incorrectCredentialsError();
  }
  await removeUser(user.email);
  return res.status(200).send({
    message: "User unregistered successfully.",
  });
}
