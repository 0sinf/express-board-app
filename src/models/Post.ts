import mongoose, { Document, PopulatedDoc, Model } from "mongoose";
import { IUserDocument } from "./User";

interface IPost extends Document {
  title: string;
  contents: string;
  author: PopulatedDoc<IUserDocument>;
  createdAt: string;
  updatedAt: string;
}

interface IPostModel extends Model<IPost> {
  createPost: (
    title: string,
    contents: string,
    author: string
  ) => Promise<IPost>;
  findPostById: (postId: string) => Promise<IPost>;
  findAll: () => Promise<Array<IPost>>;
  updatePost: (id: string, title: string, contents: string) => Promise<IPost>;
  deletePost: (id: string) => Promise<void>;
}

const PostSchema = new mongoose.Schema<IPost>(
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
      type: mongoose.Schema.Types.ObjectId,
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

PostSchema.statics.findPostById = async (postId) => {
  return await Post.findById(postId).populate("author");
};

PostSchema.statics.findAll = async () => {
  return await Post.find().populate("author");
};

PostSchema.statics.updatePost = async (id, title, contents) => {
  return await Post.findByIdAndUpdate(
    id,
    { title, contents },
    { new: true }
  ).populate("author");
};

PostSchema.statics.deletePost = async (id) => {
  await Post.findByIdAndDelete(id);
};

const Post = mongoose.model<IPost, IPostModel>("Post", PostSchema);

export { Post };
