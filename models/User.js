import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.createUser = async function (email, password, name) {
  const user = await User.create({ email, password, name });
  return user.id;
};

const User = mongoose.model("User", UserSchema);

export { User };
