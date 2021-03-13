require('dotenv').config()
const { createServer }  = require('./createServer')

createServer(process.env.MONGODB_URI)
  .then(server => server.listen({ port: process.env.PORT || 4000 }, () => 
  console.log(`🚀 Server ready!`)))

