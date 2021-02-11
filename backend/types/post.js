const { UserInputError, AuthenticationError, gql } = require('apollo-server')
const Post = require('../models/postModel')
const User = require('../models/userModel')

const typeDefs = gql`
    type Post {
        id: ID!,
        writtenBy: User!,
        startDate: String!,
        endDate: String!,
        text: String!,
        guests: [String]!
    }
    extend type Query {
        postCount: Int!
        allPosts: [Post!]!
    }

    extend type Mutation {
        addPost(
            startDate: String!,
            endDate: String!
            text: String!,
            guests: [String]!
        ): Post,
        removePost(
          id: ID!
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
      
      if (post.startDate instanceof Date && post.endDate instanceof Date) {
        console.log('uusi merkintä luotu', post.text)
      } else {
        console.log(post.validateSync().errors['startDate'])
        console.log(post.validateSync().errors['endDate'])
      }
      try {
        await post.save()
        currentUser.posts = currentUser.posts.concat(post)
        await currentUser.save()
        console.log('uusi merkintä tallennettu', post.startDate, post.endDate)
      } catch (error) {
        console.log('catchissa: tallentaminen ei onnistunut', error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return post
    },
    removePost: async (root, args, { currentUser }) => { 
      if (!currentUser) {
          throw new AuthenticationError('Not authenticated!')
      }
      try {
          const posts = currentUser.posts.filter((p)=> p.id !== args.id) //ei poista käyttäjältä!
          console.log(posts)
          currentUser.posts = posts
          await currentUser.save()
          return Post.findByIdAndRemove(args.id)
        } catch (error) { 
          throw new UserInputError(error.message, {
            invalidArgs: args,
        })
      }
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