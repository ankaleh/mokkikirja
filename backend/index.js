const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const mongoose = require('mongoose')
const merge  = require('lodash/merge')
const Post = require('./post')
const Task = require('./task')
const User = require('./user')

//yhdistetään tietokantan:
const mongoUrl = process.env.MONGODB_URI
//const secret = process.env.SECRET
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('Yhditetty MOngoDB:hen.')
    })
    .catch((error) => {
        console.log('Virhe yhdistettäessä MongoDB:hen: ', error.message)
})

const Query = `
    type Query {
        allTasks: [Task!]
        allPosts: [Post!]
        findPost(writtenBy: String!): Post
    }
`
const resolvers = {
    Query: {
        /* allTasks: () => tasks,
        allPosts: () => posts,
        findPost: (root, args) => posts.find(p => p.writtenBy == args.writtenBy)  */
    }
}

const schema = makeExecutableSchema({
    typeDefs: [ Query, Task.typeDef, Post.typeDef, User.typeDef, User.mutation ],
    resolvers: merge(resolvers, User.resolvers),
})

const server = new ApolloServer({
    schema
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
