import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'

require('dotenv-defaults').config()
const mongoose = require('mongoose')
const Message = require('./models/message')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
})


const pubsub = new PubSub()
const server_graphql = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: {
    Message,
    pubsub
  }
})

server_graphql.start({ port: process.env.PORT | 4000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 4000}!`)
})
// import { GraphQLServer, PubSub } from 'graphql-yoga'
// import Query from './resolvers/Query'
// import Mutation from './resolvers/Mutation'
// import Subscription from './resolvers/Subscription'

// require('dotenv-defaults').config()
// const mongoose = require('mongoose')
// const Message = require('./models/message')

// if (!process.env.MONGO_URL) {
//   console.error('Missing MONGO_URL!!!')
//   process.exit(1)
// }

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

// const dbb = mongoose.connection

// dbb.on('error', (error) => {
//   console.error(error)
// })

// dbb.once('open', () => {
//   console.log('MongoDB connected!')
// })


// const pubsub = new PubSub()
// const server2 = new GraphQLServer({
//   typeDefs: './server/schema.graphql',
//   resolvers: {
//     Query,
//     Mutation,
//     Subscription
//   },
//   context: {
//     Message,
//     pubsub
//   }
// })

// server2.start({ port: process.env.PORT | 4000 }, () => {
//   console.log(`The server is up on port ${process.env.PORT | 4000}!`)
// })
