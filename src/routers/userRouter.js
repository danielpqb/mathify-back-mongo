import express from "express";

import {
  getUserByToken,
  signIn,
  signUp,
  getAll,
} from "../controllers/userController.js";
import {
  signInValidation,
  signUpValidation,
} from "../middlewares/userValidationMiddleware.js";

const router = express.Router();

router.get("/me", getUserByToken);
router.post("/register", signUpValidation, signUp);
router.post("/login", signInValidation, signIn);
router.get("/all", getAll);

export { router as userRouter };
