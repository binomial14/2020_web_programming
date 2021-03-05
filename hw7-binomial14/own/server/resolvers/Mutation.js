const Mutation = {
    createMessage: async (parent, args, { Message, pubsub }, info) => {
        console.log('create')
        const new_message = {
            ...args.data
        }
        pubsub.publish('message', {
            message: {
              mutation: 'CREATED',
              data: new_message
            }
          })
        console.log("published")
        return await Message.create(new_message).then((u) => {
            return u
        })
        // return new_message
      },
      deleteMessage: async (parent, args, { Message }, info) => {
        console.log('delete')
        const return_info = {
            type: 'info',
            msg: 'Message cache cleared.'
        }
        return await Message.deleteMany({}).then(() => {
            return return_info
        })
        // return new_message
      },
}
module.exports = Mutation