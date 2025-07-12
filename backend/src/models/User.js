import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fblank-profile-picture&psig=AOvVaw1T4B18O-9ZfASXFCaK3LBg&ust=1752391345772000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjo3c_kto4DFQAAAAAdAAAAABAE",
    },
  },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);
