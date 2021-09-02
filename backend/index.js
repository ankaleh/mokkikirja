const config = require('./config')
const { createServer }  = require('./createServer')
const port = config.PORT
createServer(config.MONGODB_URI)
  .then(server => server.listen({ port: port }, () =>
    console.log(`🚀 Development server ready on port ${port}!`)))

