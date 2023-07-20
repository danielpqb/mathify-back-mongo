import { ApplicationError } from "../types/Error";

export function userNotFoundError(): ApplicationError {
  return {
    name: "UserNotFoundError",
    message: "This user does not exist.",
  };
}

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email.",
  };
}

export function incorrectCredentialsError(): ApplicationError {
  return {
    name: "IncorrectCredentialsError",
    message: "The given user information is incorrect.",
  };
}

export function invalidTokenError(): ApplicationError {
  return {
    name: "InvalidTokenError",
    message: "The given token was passed incorrectly or it does not exist.",
  };
}
