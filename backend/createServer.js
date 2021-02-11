const { ApolloServer, makeExecutableSchema, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const merge  = require('lodash/merge')

const post = require('./types/post')
const task = require('./types/task')
const user = require('./types/user')
const reservation = require('./types/reservation')

const User = require('./models/userModel')

require('dotenv').config()
const secret = process.env.SECRET

const createServer = async (mongoUri) => {

  await mongoose.connect(mongoUri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Yhdistetty tietokantaan.')
    })
    .catch((error) => {
      console.log('Virhe yhdistettäessä testitietokantaan: ', error.message)
    })
  const Query = gql`
    type Query {
        _empty: String
    }
`
  const Mutation = gql`
    type Mutation {
        _empty: String
    }
`
  const schema = makeExecutableSchema({
    typeDefs: [ task.typeDefs, post.typeDefs, user.typeDefs, reservation.typeDefs, Query, Mutation ],
    resolvers: merge(user.resolvers, post.resolvers, task.resolvers, reservation.resolvers),
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

  return server
}



module.exports.createServer = createServer