const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')

//fonctions qui vont s'executer quand on va lancer la query correspondante
module.exports = {
    Query: {
        async getPosts() {
            try {
                // Post est ce qu'on a require plus haut
                //sort by createdAt desc
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId)
                if (post) {
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context)
            console.log(user)

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save()

            return post
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            console.log(user)

            try {
                const post = await Post.findById(postId)
                if (user.username === post.username) {
                    await post.delete()
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (err) {
                throw new Error(err)
            }
        },
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)
            if (post) {
                if (post.likes.find(like => like.username) === username) {
                    //Post already like, unlike it
                    post.likes = post.like.filter(like => like.username !== username)
                } else {
                    //Post ,not like, like it
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save()
                return post
            } else throw new UserInputError('Post not found')
        }
    }
}
