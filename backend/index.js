require('dotenv').config()
const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const merge  = require('lodash/merge')

const post = require('./post')
const task = require('./task')
const user = require('./user')

const User = require('./models/userModel')

const secret = process.env.SECRET
//yhdistetään tietokantan:
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('Yhdistetty MOngoDB:hen.')
    })
    .catch((error) => {
        console.log('Virhe yhdistettäessä MongoDB:hen: ', error.message)
})

const Query = `
    type Query {
        ${user.query}
        ${post.query}
        ${task.query}
    }
`
const Mutation = `
    type Mutation {
        ${user.mutation}
        ${post.mutation}
        ${task.mutation}
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
    typeDefs: [ task.typeDef, post.typeDef, user.typeDef, Query, Mutation ],
    resolvers: merge(resolvers, user.resolvers, post.resolvers, task.resolvers),
})

const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        // authiin asetetaan pyynnön Authorization-otsakkeen tiedot eli token,
        //ja jos headerina ei tule validia tokenia, kysely vastaa "null":
        const auth = req ? req.headers.authorization : null 
        //console.log(req.headers.authorization)
        if (auth && auth.toLowerCase().startsWith('bearer')) {
            const decodedToken = jwt.verify(auth.substring(7), secret)
            console.log('decodedToken: ', decodedToken)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser } //contextin kentäksi
        }
        
    }
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
