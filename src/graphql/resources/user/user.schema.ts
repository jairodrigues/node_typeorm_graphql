const userTypes = `
    #User definition type
    type User {
        id: ID!
        name: String!
        email: String!
        photo: String
        createdAt: String!
        updatedAt: String!
        posts(take: Int, skip: Int): [Post!]!
    }

    input UserCreateInput{
        name: String!
        email: String!
        password: String!
    }

    input UserUpdateInput{
        name: String!
        email: String!
        photo: String
    }

    input UserUpdatePwdInput{
        password: String!
    }
`;

const userQueries = `
    users(take: Int, skip: Int): [ User! ]!
    user(id: ID!): User
`;

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserUpdateInput!): User
    updateUserPwd(id: ID!, input: UserUpdatePwdInput!): Boolean
    deleteUser(id: ID!): Boolean
`;

export { userTypes, userQueries, userMutations };
