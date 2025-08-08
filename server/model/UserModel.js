import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    bio: {type:String, default:""},
    profilePic: {type:String, default:""},
    nativeLanguage: {type:String, default:""},
    learningLanguage: {type:String, default:""},
    location: {type:String, default:""},
    isOnboarded: {type:Boolean, default:false},
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;
