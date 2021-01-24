require('dotenv').config()
const { createServer }  = require('./createServer')


createServer(process.env.MONGODB_URI)
  .then(server => server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  }))

