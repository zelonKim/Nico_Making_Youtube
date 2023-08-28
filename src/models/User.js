import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref:"Comment" }], // user는 많은 comments를 작성할 수 있음. -> 배열[] O
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
});


userSchema.pre("save", async function () {
  if (this.isModified("password")) { 
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;