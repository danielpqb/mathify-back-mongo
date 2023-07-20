import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/User.js";
import { findUserByToken } from "../services/user-service.js";
import { invalidTokenError } from "../errors/user-error.js";

export async function userTokenAuthorization(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw invalidTokenError();
  }

  const user = await findUserByToken(token);

  if (!user) {
    return res.status(401).send({ message: "User not found" });
  }
  req.user = user;

  next();
}
