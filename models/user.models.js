import mongoose from "mongoose";
import crypto from "crypto";

const salt = "secret";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/default/default_profile.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  const hashedPassword = crypto
    .createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");
  this.password = hashedPassword;
  this.salt = salt;

  return;
});

userSchema.statics.match_password_function = async function (
  email,
  user_password
) {
  const user = await this.findOne({ email });
  const userHashedPass = crypto
    .createHmac("sha256", salt)
    .update(user_password)
    .digest("hex");

  console.log("USER HASHED PASS: ", userHashedPass);
  console.log(user);
  console.log(user.password);

  if (userHashedPass == user.password) {
    console.log("MATCHED");
    return user;
  } else {
    console.log("not MATCHED");
    return false;
  }
};

const User = mongoose.model("User", userSchema);
export default User;
