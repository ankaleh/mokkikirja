const { UserInputError } = require('apollo-server')
const Post = require('./models/postModel')
const User = require('./models/userModel')

const typeDef = `
    type Post {
        id: ID!
        writtenBy: String!
        date: String!
        text: String!
        guests: [String]!
    }
`

const mutation = `
    type Mutation {
        addPost(
            id: ID!
            writtenBy: String!
            date: String!
            text: String!
            guests: [String]!
        ): Post
    }
`

const resolvers = {
    Mutation: {
        addPost: async (root, args) => {
            const post = new Post({...args})
            try {
                await post.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return post
        }
            
    },
   /*  Post: {
        writtenBy: async (root, args) => {
            const user = await User.findById(root.writtenBy)
            return user
        }
    } */
}

module.exports = { typeDef/* , mutation, resolvers */ }