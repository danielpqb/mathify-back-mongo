import express from "express";

import { getUserByToken, signIn, signUp } from "../controllers/user-controller.js";
import { signInValidation, signUpValidation } from "../middlewares/user-validation-middleware.js";

const router = express.Router();

router.get("/me", getUserByToken);
router.post("/register", signUpValidation, signUp);
router.post("/login", signInValidation, signIn);

export { router as userRouter };
