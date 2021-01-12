const { UserInputError, AuthenticationError } = require('apollo-server')
const Post = require('./models/postModel')
const User = require('./models/userModel')

const typeDef = `
    type Post {
        id: ID!,
        writtenBy: User!,
        date: String!,
        text: String!,
        guests: [String]!
    }
`
const query = `
    postCount: Int!
    allPosts: [Post!]!
`
const mutation = `
    addPost(
        date: String!,
        text: String!,
        guests: [String]!
    ): Post
`
const resolvers = {
    Mutation: {
        addPost: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('Not authenticated backend.postissa!')
            }
            const post = new Post({ ...args, writtenBy: currentUser } )
            try {
                await post.save()
                currentUser.posts = currentUser.posts.concat(post)
                await currentUser.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return post
        }
    },
    Query: {
        postCount: (root, args) => {
            return Post.collection.countDocuments();
        },
        allPosts: (root, args, { currentUser }) => { //tähän kirjautumisvaatimus!!!
            if (!currentUser) {
                throw new AuthenticationError('Not authenticated backend.postissa!')
            }
            return Post.find({})
        }
    },
    Post: {
        writtenBy: async (root) => {
            const user = await User.findById(root.writtenBy)
            return user
        }
    }
}

module.exports = { typeDef, query, mutation, resolvers }