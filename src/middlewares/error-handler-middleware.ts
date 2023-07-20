import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../types/Error";

export function handleApplicationErrors(
  error: ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  switch (error.name) {
  case "IncorrectCredentialsError":
  case "InvalidTokenError":
    return res.status(401).send(error);
  case "UserNotFoundError":
    return res.status(404).send(error);
  case "DuplicatedEmailError":
    return res.status(409).send(error);
  }

  console.error(error.name);
  res.status(500).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });

  next();
}

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 404 Not Found
// 409 Conflict
// 414 URI Too Long
// 416 Range Not Satisfiable
// 422 Unprocessable Content
// 429 Too Many Requests
// 500 Internal Server Error
