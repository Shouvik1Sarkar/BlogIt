import mongoose from "mongoose";
function connectDB(url) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("DATA BASE CONNECTED PROPERLY");
    })
    .catch((err) => {
      throw new Error("Error connecting the db, ", err);
    });
}
export default connectDB;
