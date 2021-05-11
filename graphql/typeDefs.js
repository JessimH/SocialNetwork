const gql = require('graphql-tag')

//type de query du projet
module.exports = gql`
    type Post{
        id: ID!
        username: String!
        body: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
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
        getPost(postId: ID!): Post
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postID: ID!): Post!
    }
`
