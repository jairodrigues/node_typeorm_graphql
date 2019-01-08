import { getConnection } from "typeorm"; // for transactions

import { Post } from "../../../entity/Post";
import { User } from "../../../entity/User";
import { Comment } from "../../../entity/Comment";
import { handleError } from "../../../utils/utils";

export const postResolver = {
  Post: {
    author: async ({ author }) => {
      return User.findOne(author).catch(handleError);
    },

    comments: async ({ comments }, { take = 2, skip = 0 }) => {
      return await Comment.find({
        where: { post: comments },
        take,
        skip
      }).catch(handleError);
    }
  },
  Query: {
    posts: async (_post, { take = 2, skip = 0 }) => {
      return await Post.find({ take, skip }).catch(handleError);
    },

    post: async (_post, { id }) => {
      id = parseInt(id);
      const post = await Post.findOne(id).catch(handleError);
      if (!post) throw new Error(`Post with id ${id} not found!`);
      return post;
    }
  },

  Mutation: {
    createPost: async (_post, { input }) => {
      return await getConnection()
        .transaction(async transaction => {
          await transaction.getRepository(Post).create(input);
        })
        .catch(handleError);
    },

    updatePost: async (_post, { id, input }) => {
      id = parseInt(id);
      return await getConnection()
        .transaction(async transaction => {
          const post = await transaction.getRepository(Post).findOne(id);
          if (!post) throw new Error(`Post with id ${id} not found!`);
          await transaction.getRepository(Post).update(id, input);
        })
        .catch(handleError);
    },

    deleteUser: async (_post, { id }) => {
      id = parseInt(id);
      return await getConnection()
        .transaction(async transaction => {
          const post = await transaction.getRepository(Post).findOne(id);
          if (!post) throw new Error(`Post with id ${id} not found!`);
          await transaction.getRepository(Post).delete(id);
        })
        .catch(handleError);
    }
  }
};
