import { makeExecutableSchema } from "graphql-tools";
import { merge } from "lodash";

import { Query } from "./query";
import { Mutation } from "./mutation";

import { userTypes } from "./resources/user/user.schema";
import { postTypes } from "./resources/post/post.schema";
import { commentTypes } from "./resources/comment/comment.schema";

import { userResolver } from "./resources/user/user.resolvers";
import { postResolver } from "./resources/post/post.resolvers";
import { commentResolver } from "./resources/comment/comment.resouvers";

const resolvers = merge(userResolver, postResolver, commentResolver);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    userTypes,
    postTypes,
    commentTypes
  ],
  resolvers
});
