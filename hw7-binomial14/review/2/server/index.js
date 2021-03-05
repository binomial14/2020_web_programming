
require('dotenv-defaults').config()
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const { GraphQLServer ,PubSub} = require('graphql-yoga')
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')
const Message = require('./models/message')

const pubsub = new PubSub()
const port = 4000

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

const gServer = new GraphQLServer({ typeDefs: 'server/schema.graphql', resolvers: {
  Query,
  Mutation,
  Subscription
},
context: {
  pubsub
} })
db.once('open', () => {
  console.log('MongoDB connected!')
  gServer.start({port:port },() => console.log('Server is running on localhost:4000'))
  
  

})
