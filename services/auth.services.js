import jwt from "jsonwebtoken";
const secret = "shhhhhhhhhh";
function setUser(user) {
  const payload = {
    fullName: user.fullName,
    passqord: user.passqord,
    email: user.email,
    _id: user._id,
    profileImageUrl: user.profileImageUrl,
  };
  const user_token = jwt.sign(payload, secret);

  if (!user_token) {
    throw new Error("error setting jwt sign");
  }

  return user_token;
}

function getUser(token) {
  const user = jwt.verify(token, secret);
  if (!user) {
    return;
  }
  return user;
}

export { setUser, getUser };
