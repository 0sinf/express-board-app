import { Post } from "../models/Post";

export async function createPost(
  title: string,
  contents: string,
  authorId: string
) {
  const post = await Post.createPost(title, contents, authorId);
  return post.id;
}

export async function findPostById(postId: string) {
  try {
    const post = await Post.findPostById(postId);
    const { title, contents, author, createdAt } = post;
    return {
      postId,
      title,
      contents,
      createdAt,
      author: author.nickname,
    };
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function findAllPosts() {
  const posts = await Post.findAll();
  return posts.map(({ id, title, contents, author, createdAt }) => {
    return {
      postId: id,
      title,
      contents,
      author: author.nickname,
      createdAt,
    };
  });
}

export async function updatePost(
  id: string,
  prevTitle: string,
  prevContents: string
) {
  try {
    const post = await Post.updatePost(id, prevTitle, prevContents);
    const { title, contents, author, updatedAt } = post;
    return {
      postId: id,
      title,
      contents,
      author: author.nickname,
      updatedAt,
    };
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}

export async function deletePost(id: string) {
  try {
    await Post.deletePost(id);
  } catch (e) {
    throw new Error("존재하지 않는 글입니다.");
  }
}
