import { Post } from "../models/Post";

export async function createPost(title, contents, authorId) {
  const post = await Post.createPost(title, contents, authorId);
  return post.id;
}

export async function findPostById(postId) {
  const post = await Post.findPostById(postId);
  const { title, contents, author, createdAt } = post;
  return {
    postId,
    title,
    contents,
    createdAt,
    author: author.name,
  };
}
