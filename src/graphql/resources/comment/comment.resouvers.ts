import { Comment } from "../../../entity/Comment";
import { User } from "../../../entity/User";
import { Post } from "../../../entity/Post";
import { getConnection } from "typeorm";
import { handleError } from "../../../utils/utils";

export const commentResolver = {
  Comment: {
    user: async ({ user }) => {
      return await User.findOne(user).catch(handleError);
    },
    post: async ({ post }) => {
      return await Post.findOne(post).catch(handleError);
    }
  },
  Query: {
    commentsByPost: async (_comments, { post, take, skip }) => {
      return await Comment.find({ where: post, take, skip }).catch(handleError);
    }
  },
  Mutation: {
    createComment: async (_comments, { input }) => {
      return await getConnection()
        .transaction(async transaction => {
          await transaction.getRepository(Comment).create(input);
        })
        .catch(handleError);
    },
    updateComment: async (_comments, { id, input }) => {
      id = parseInt(id);
      return await getConnection()
        .transaction(async transaction => {
          const comment = await transaction.getRepository(Comment).findOne(id);
          if (!comment) throw new Error(`Comment with id ${id} not found!`);
          return await transaction.getRepository(Comment).update(id, input);
        })
        .catch(handleError);
    },
    deleteComment: async (_comments, { id }) => {
      id = parseInt(id);
      return await getConnection()
        .transaction(async transaction => {
          const comment = await transaction.getRepository(Comment).findOne(id);
          if (!comment) throw new Error(`Comment with id ${id} not found!`);
          return await transaction.getRepository(Comment).delete(id);
        })
        .catch(handleError);
    }
  }
};
