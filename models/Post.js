import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 30,
    },
    contents: {
      type: String,
      required: true,
      maxlength: 200,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.statics.createPost = async (title, contents, author) => {
  return await Post.create({
    title,
    contents,
    author,
  });
};

const Post = mongoose.model("Post", PostSchema);

export { Post };
