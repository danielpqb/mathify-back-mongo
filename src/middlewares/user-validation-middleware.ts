import { NextFunction, Request, Response } from "express";
import joi from "joi";
import { validationError } from "../errors/validation-error";

export function signUpValidation(req: Request, res: Response, next: NextFunction) {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { name, email, password } = req.body;

  const validation = schema.validate({ name, email, password }, { abortEarly: false });
  if (validation.error) {
    throw validationError(validation.error);
  }
  next();
}

export function signInValidation(req: Request, res: Response, next: NextFunction) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { email, password } = req.body;

  const validation = schema.validate({ email, password }, { abortEarly: false });
  if (validation.error) {
    throw validationError(validation.error);
  }
  next();
}

export function unregisterUserValidation(req: Request, res: Response, next: NextFunction) {
  const schema = joi.object({
    email: joi.string().email().required(),
  });

  const { email } = req.body;

  const validation = schema.validate({ email }, { abortEarly: false });
  if (validation.error) {
    throw validationError(validation.error);
  }
  next();
}
