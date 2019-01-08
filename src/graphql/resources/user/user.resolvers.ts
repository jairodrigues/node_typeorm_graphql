import { getConnection } from "typeorm"; //for transactions

import { User } from "../../../entity/User";
import { Post } from "../../../entity/Post";
import { handleError } from "../../../utils/utils";
import CreateError from "http-errors";

export const userResolver = {
  //Por padrão alguns resolver triviais já são implementados pelo graphql, porem casos que não temos resolvers
  // triviais é necessário implementa-lo
  User: {
    posts: async ({ id }, { take = 10, skip = 0 }) => {
      id = parseInt(id);
      return await Post.find({ where: { author: id }, skip, take }).catch(
        handleError
      );
    }
  },
  Query: {
    users: async (_user, { take = 10, skip = 0 }) => {
      try {
        return await User.find({ take, skip });
      } catch (err) {
        return handleError(err);
      }
    },

    user: async (_user, { id }) => {
      try {
        id = parseInt(id);
        const user = await User.findOne(id);
        if (!user)
          throw new CreateError.Forbidden(`User with id ${id} not found!`);
        return user;
      } catch (err) {
        return handleError(err);
      }
    }
  },

  Mutation: {
    createUser: async (_user, { input }) => {
      return await getConnection()
        .transaction(async transaction => {
          const user = await User.create(input);
          await transaction.save(user);
          return user;
        })
        .catch(handleError);
    },

    updateUser: async (_user, { id, input }) => {
      id = parseInt(id);
      return await getConnection()
        .transaction(async transaction => {
          let user = await transaction.findOne(User, id);
          if (!user) throw new Error(`User with id ${id} not found!`);
          await transaction.update(User, id, { ...input });
          return user;
        })
        .catch(handleError);
    },

    updateUserPwd: async (_user, { id, input }) => {
      id = parseInt(id);
      return await getConnection()
        .transaction(async transaction => {
          const user = await transaction.getRepository(User).findOne(id);
          if (!user) throw new Error(`User with id ${id} not found!`);
          const passwordUpdate = await transaction
            .getRepository(User)
            .update(id, input);
          if (!passwordUpdate) return false;
          return true;
        })
        .catch(handleError);
    },

    deleteUser: async (_user, { id }) => {
      id = parseInt(id);
      return await getConnection()
        .transaction(async transaction => {
          const user = await transaction.getRepository(User).findOne(id);
          if (!user) throw new Error(`User with id ${id} not found!`);
          await transaction.getRepository(User).delete(id);
        })
        .catch(handleError);
    }
  }
};
