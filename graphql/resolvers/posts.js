const Post = require('../../modules/Post')
const checkAuth = require('../../util/check-auth')

//fonctions qui vont s'executer quand on va lancer la query correspondante
module.exports = {
    Query: {
        async getPosts() {
            try {
                // Post est ce qu'on a require plus haut
                const posts = await Post.find()
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
        }
    }
}
