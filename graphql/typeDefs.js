const gql = require('graphql-tag')

//type de query du projet
module.exports = gql`
    type Post{
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }
    type User{
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        token: String!
    }
    input RegisterInput{
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }
    type Query{
        # [] pour dire que c'est un Array of Posts
        getPosts: [Post]
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`
