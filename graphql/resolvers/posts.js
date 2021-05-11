const Post = require('../../modules/Post')

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
        }
    }
}
