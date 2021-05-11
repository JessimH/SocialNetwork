const User = require('../../modules/User')

module.exports = {
    Mutation: {
        register(_, args, context, info) {
            //TOTO validate user data
            //TOTO make sure user doesn't already exist
            //TOTO hash the password and create an auth token
        }
    }
}