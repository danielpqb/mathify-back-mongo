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
// 405 Method Not Allowed
// 406 Not Acceptable
// 407 Proxy Authentication Required
// 408 Request Timeout
// 409 Conflict
// 410 Gone
// 411 Length Required
// 412 Precondition Failed
// 413 Content Too Large
// 414 URI Too Long
// 415 Unsupported Media Type
// 416 Range Not Satisfiable
// 417 Expectation Failed
// 418 I'm a teapot
// 421 Misdirected Request
// 422 Unprocessable Content
// 423 Locked
// 424 Failed Dependency
// 425 Too Early
// 426 Upgrade Required
// 428 Precondition Required
// 429 Too Many Requests
// 431 Request Header Fields Too Large
// 451 Unavailable For Legal Reasons
// 500 Internal Server Error
