const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const merge  = require('lodash/merge')
const Post = require('./post')
const Task = require('./task')

let tasks = [
    {
        id: "123",
        description: "ikkunoiden pesu",
        addedBy: "Anna",
        doneBy: "Anna",
        done: true
    },
    {
        id: "456",
        description: "räystäät",
        addedBy: "Mauri",
        doneBy: "Mauri",
        done: false
    }
]

let posts = [
    {
        id: 876,
        writtenBy: "Mauri",
        date: "02-05-2020",
        text: "Hei!",
        guests: "Anna, Mauri ja Alina"
    }
]

const Query = `
    type Query {
        allTasks: [Task!]
        allPosts: [Post!]
        findPost(writtenBy: String!): Post
    }
`
const resolvers = {
    Query: {
        allTasks: () => tasks,
        allPosts: () => posts,
        findPost: (root, args) => posts.find(p => p.writtenBy == args.writtenBy) 
    }
}

const schema = makeExecutableSchema({
    typeDefs: [ Query, Post.typeDef, Task.typeDef, Post.mutation ],
    resolvers: merge(resolvers, Post.resolvers),
})

const server = new ApolloServer({
    schema
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
