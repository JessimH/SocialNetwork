const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')

//creation du serveur Apollo avec les query et fonctions que l'ont a créé
const server = new ApolloServer({
    typeDefs,
    resolvers
})

//connexion a la base de donné mongoose
mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MONGOSB connected')
        //start le serveur Apollo (il fonctionne avec express)
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`server running at ${res.url}`)
    })