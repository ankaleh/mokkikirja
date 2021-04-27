require('dotenv').config()
const { createServer }  = require('./createServer')
const port = process.env.PORT || 4000
createServer(process.env.MONGODB_URI)
  .then(server => server.listen({ port: port }, () => 
  console.log(`🚀 Server ready on port ${port}!`)))

