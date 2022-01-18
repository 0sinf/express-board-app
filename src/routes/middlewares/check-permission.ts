import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/Post.js";

export default function (req: Request, res: Response, next: NextFunction) {
  const { user } = req;
  const { postId } = req.params;

  Post.findPostById(postId)
    .then((post) => {
      if (post.author.id === user.id) {
        next();
      } else {
        next("권한이 없습니다.");
      }
    })
    .catch((err: any) => {
      next("존재하지 않는 글입니다.");
    });
}
