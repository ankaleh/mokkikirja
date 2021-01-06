require('dotenv').config()
const { UserInputError } = require('apollo-server')
const User = require('./models/userModel')

const typeDef = `
    type User {
        id: ID!
        name: String!
        username: String!
        password: String!
        tasks: [ Task ]
        posts: [ Post ]
    }
`

const mutation = `
    type Mutation {
        createUser(
            name: String!
            username: String!
            password: String!
        ): User
    }
`

const resolvers = {
    Mutation: {
        createUser: async (root, args) => {
            const newUser = new User({ name: args.name, username: args.username, password: args.password })
            try {
              await newUser.save()
            } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
          }
          return newUser
        }
    }
}

module.exports = { typeDef, mutation, resolvers }