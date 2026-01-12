import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import connectDB from "./db/dbConnect.js";
import userRouter from "./route/user.route.js";
import cookieParser from "cookie-parser";

import { checkLogInAuth } from "./middleware/loginAuth.middleware.js";

const port = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(checkLogInAuth("user_id"));

// connect database

connectDB(process.env.MONGODB_URI);

// setup ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// serve static files why to be able to use assets from public dir
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.use("/users", userRouter);

app.listen(port, () => console.log(`BlogIt running at port ${port}`));
