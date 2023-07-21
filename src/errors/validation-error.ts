import { ValidationError } from "joi";
import { ApplicationError } from "../types/Error";

export function validationError(validation: ValidationError): ApplicationError {
  const message: string[] = [];
  validation.details.forEach((e) => {
    message.push(e.message);
  });

  return {
    name: "ValidationError",
    message: message.join("\n\n"),
  };
}
