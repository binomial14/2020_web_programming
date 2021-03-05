const Mutation = {
    createMessage: async (parent, args, { Message, pubsub }, info) => {
        console.log('create')
        const new_message = {
            ...args.data
        }
        await Message.create(new_message)
        let tmp;
        await Message.find().then((messages) => {
          tmp = messages
        })
        pubsub.publish('message', {
            message: {
              mutation: 'CREATED',
              data: tmp
            }
          })
        console.log("published")
        return await Message.create(new_message).then((u) => {
            console.log(u)
            return u
        })
        // return new_message
      },
    deleteMessage: async (parent, args, { Message, pubsub }, info) => {
        console.log('delete')
        const return_info = {
            type: 'info',
            msg: 'Message cache cleared.'
        }
        await Message.deleteMany({...args.data})
        let tmp;
        await Message.find().then((messages) => {
          tmp = messages
        })
        console.log(tmp)
        pubsub.publish('message', {
          message: {
            mutation: 'DELETED',
            data: tmp
          }
        })
        // await Message.deleteMany({...args.data})
        return await Message.find().then((messages) => {
          // console.log(messages)
          return messages
      })
        // return new_message
      },
}
module.exports = Mutation