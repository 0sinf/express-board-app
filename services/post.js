import { Post } from "../models/Post.js";

export async function createPost(title, contents, authorId) {
  const post = await Post.createPost(title, contents, authorId);
  return post.id;
}

export async function findPostById(postId) {
  try {
    const post = await Post.findPostById(postId);
    const { title, contents, author, createdAt } = post;
    return {
      postId,
      title,
      contents,
      createdAt,
      author: author.name,
    };
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function findAllPosts() {
  const posts = await Post.findAll();
  return posts.map(({ _id, title, contents, author, createdAt, updatedAt }) => {
    return {
      postId: _id,
      title,
      contents,
      author: author.name,
      createdAt,
    };
  });
}

export async function updatePost(id, prevTitle, prevContents) {
  try {
    const post = await Post.updatePost(id, prevTitle, prevContents);
    const { title, contents, author, updatedAt } = post;
    return {
      id,
      title,
      contents,
      author: author.name,
      updatedAt,
    };
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}
