const { UserInputError } = require('apollo-server')
const User = require('./models/userModel')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

const typeDef = `
    type User {
        id: ID!
        name: String!
        username: String!
        password: String!
        tasks: [ Task ]
        posts: [ Post ]
    }
    type Token {
        value: String!
    }
`
const query = `
    me: User
`
const mutation = `
    createUser(
        name: String!
        username: String!
        password: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
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
        },
        login: async (root, args) => {
            const userLoggingIn = await User.findOne({ username: args.username })
            if ( !userLoggingIn && args.password !== 'akuankka' ) {
                throw new UserInputError('Wrong credentials!')
            }
            console.log('login: ', userLoggingIn.username, userLoggingIn._id)
            const userForToken = { username: userLoggingIn.username, id: userLoggingIn._id }
            console.log(`token: "bearer ${jwt.sign(userForToken, secret)}"`)
            return { value: jwt.sign(userForToken, secret) } //palautetaan skeemassa määritetyn Token-tyypin kenttä value
        }
    },
    Query: {
        me: (root, args, { currentUser }) => {
            return currentUser
        }
    }
}

module.exports = { typeDef, query, mutation, resolvers }