import { ValidationError } from "joi";
import { ApplicationError } from "../types/Error";

export function validationError(validation: ValidationError): ApplicationError {
  let message = "";
  validation.details.forEach((e) => {
    message += e.message + "\n\n";
  });

  return {
    name: "ValidationError",
    message: message,
  };
}
