require('dotenv-defaults').config()
const { GraphQLServer, PubSub } = require('graphql-yoga')
const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')

const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation')
const Subscription = require('./resolvers/subscription')
const Message = require('./models/message')

// const app = express()
// const server = http.createServer(app)
// const wss = new WebSocket.Server({ server })

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./server/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: {
    Message,
    pubsub
  },
});


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
  console.log('Graphql, MongoDB connected!')
  // Message.find({name: "Leo"}).then(messages => {
  //   return messages
  // })
  // console.log(Message.find())
  // wss.on('connection', ws => {
  //   const sendData = (data) => {
  //     ws.send(JSON.stringify(data))
  //   }

  //   const sendStatus = (s) => {
  //     sendData(['status', s])
  //   }

  //   Message.find()
  //     .limit(100)
  //     .sort({ _id: 1 })
  //     .exec((err, res) => {
  //       if (err) throw err

  //       // initialize app with existing messages
  //       sendData(['init', res])
  //     })

  //   ws.onmessage = (message) => {
  //     const { data } = message
  //     console.log(message)
  //     const [task, payload] = JSON.parse(data)

  //     switch (task) {
  //       case 'input': {
  //         // TODO
  //         Message.insertMany([payload], () => {
  //           sendData(['output',[payload]])

  //           sendStatus({
  //             type: 'info',
  //             msg: 'Message cache added.'
  //           })
  //         })
          

  //         break
  //       }
  //       case 'clear': {
  //         Message.deleteMany({}, () => {
  //           sendData(['cleared'])

  //           sendStatus({
  //             type: 'info',
  //             msg: 'Message cache cleared.'
  //           })
  //         })

  //         break
  //       }
  //       default:
  //         break
  //     }
  //   }
  // })

  server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}!`);
  });

  // const PORT = process.env.port || 4000
  
  // server.listen(PORT, () => {
  //   console.log(`Listening on http://localhost:${PORT}`)
  // })
})
