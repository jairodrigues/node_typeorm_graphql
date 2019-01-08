const postTypes = `

    type Post{
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        updatedAt: String!
        author: User!
        comments: [Comment!]
    }

    input PostInput {
        title: String!
        content: String!
        photo: String!
        author: Int!
    }
`;

const postQueries = `
    posts(take: Int, skip: Int): [Post!]!
    post(id: ID!): Post
`;

const postMutations = `
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Boolean
`;

export { postTypes, postQueries, postMutations };
