import express from "express";

import { getUserByToken, signIn, signUp, unregisterUser } from "../controllers/user-controller.js";
import {
  signInValidation,
  signUpValidation,
  unregisterUserValidation,
} from "../middlewares/user-validation-middleware.js";
import { userTokenAuthorization } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/me", userTokenAuthorization, getUserByToken);
router.post("/register", signUpValidation, signUp);
router.post("/login", signInValidation, signIn);
router.delete("/unregister", userTokenAuthorization, unregisterUserValidation, unregisterUser);

export { router as userRouter };
