import { db } from "../database/database";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

async function signUp(req: any, res: any) {
  try {
    //Find user by email
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    //Check if user exists
    if (user) {
      res.status(409).send({ message: "User already exists." });
      return;
    }

    //Encode password
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    //Create a new user
    await db.collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      createdAt: new Date(Date.now()),
    });
    res.status(201).send({ message: "User created successfully." });
  } catch (error: any) {
    res.status(500).send(error.message);
    return;
  }
}

async function signIn(req: any, res: any) {
  try {
    //Find user by email
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    //Check if user exists AND password is correct
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = uuid();

      await db
        .collection("users")
        .updateOne(
          { _id: user._id },
          { $set: { lastLogin: new Date(Date.now()), token } }
        );

      res.status(200).send({
        message: "You are loged in.",
        token,
        email: user.email,
        name: user.name,
      });
      return;
    } else {
      res.status(409).send({ message: "Invalid data." });
      return;
    }
  } catch (error: any) {
    res.status(500).send(error.message);
    return;
  }
}

async function getUserByToken(req: any, res: any) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "Invalid token" });
  }

  try {
    const user = await db.collection("users").findOne({ token });

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    delete user.password;
    res.status(200).send({
      message: "User found with token.",
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export { signUp, signIn, getUserByToken };
