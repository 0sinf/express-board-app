import { Post } from "../models/Post";

export async function createPost(title, contents, authorId) {
  const post = await Post.createPost(title, contents, authorId);
  return post.id;
}
