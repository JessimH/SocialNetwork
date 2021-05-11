const { model, Schema } = require('mongoose')

//Creation du Schema Post utilisé pour la base de donné
const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    //link post a son utilisateur, même si mongodb est du noSQL on peut lier les tables entre elles
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema)