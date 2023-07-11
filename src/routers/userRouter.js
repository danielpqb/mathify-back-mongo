import express from "express";

import {
  getUserByToken,
  signIn,
  signUp,
} from "../controllers/userController.js";
import {
  signInValidation,
  signUpValidation,
} from "../middlewares/userValidationMiddleware.js";

const router = express.Router();
router.use("/user");

router.get("/me", getUserByToken);
router.post("/register", signUpValidation, signUp);
router.post("/login", signInValidation, signIn);

export { router as userRouter };
