const { UserInputError, AuthenticationError, gql } = require('apollo-server')
const Post = require('../models/postModel')
const User = require('../models/userModel')

const typeDefs = gql`
    type Post {
        id: ID!,
        writtenBy: User!,
        date: String!,
        text: String!,
        guests: [String]!
    }
    extend type Query {
        postCount: Int!
        allPosts: [Post!]!
    }

    extend type Mutation {
        addPost(
            date: String!,
            text: String!,
            guests: [String]!
        ): Post
    }
`
const resolvers = {
  Mutation: {
    addPost: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated backend.postissa!')
      }
      const post = new Post({ ...args, writtenBy: currentUser } )
      
      if (post.date instanceof Date) {
        console.log('uusi merkintä luotu', post.text)
      } else {
        console.log(post.validateSync().errors['date'])
      }
      try {
        await post.save()
        currentUser.posts = currentUser.posts.concat(post)
        await currentUser.save()
        console.log('uusi merkintä tallennettu', post.text)
      } catch (error) {
        console.log('catchissa')
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return post
    }
  },
  Query: {
    postCount: () => {
      return Post.collection.countDocuments()
    },
    allPosts: (root, args, { currentUser }) => { //tähän kirjautumisvaatimus!!!
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated backend.postissa!')
      }
      return Post.find({})
    }
  },
  Post: {
    writtenBy: async (root, args, { currentUser }) => {
      const user = await User.findById(root.writtenBy)
      return user
    }
  }
}

module.exports = { typeDefs, resolvers }