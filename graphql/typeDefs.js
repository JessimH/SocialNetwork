const gql = require('graphql-tag')

//type de query du projet
module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        # [] pour dire que c'est un Array of Posts
        getPosts: [Post]
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
    }
`
