import express from "express";

import {
  handleSignUpPage,
  handleSignInPage,
} from "../controllers/user.controllers.js";
import User from "../models/user.models.js";
import { setUser } from "../services/auth.services.js";

const userRouter = express.Router();

userRouter.get("/signup", handleSignUpPage);
userRouter.get("/signin", handleSignInPage);

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.render("signup", {
      error: "All the fields are required",
    });
    // throw new Error("All the fields are required");
    console.log("ALL FIELDS ARE REQUIRED");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  if (!user) {
    req.render("signup", {
      error: "Something went wrong",
    });
    throw new Error("Something went wrong");
  }
  console.log("USER", user);

  return res.redirect("/users/signin");
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("signin", {
      error: "All the fields are required",
    });
  }
  const user = await User.match_password_function(email, password);
  console.log("USER: ", user);
  if (!user) {
    return res.render("signin", {
      error: "email or password not matched",
    });
  }
  const thisuser = setUser(user);
  return res.cookie("user_id", thisuser).redirect("/");
});

export default userRouter;
