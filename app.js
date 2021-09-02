const config = require('./backend/config')
const { createServer }  = require('./backend/createServer')

createServer(config.MONGODB_URI)
  .then(server => server.listen(config.PORT, () =>
    console.log(`🚀 Server ready on port ${config.PORT}!`)))