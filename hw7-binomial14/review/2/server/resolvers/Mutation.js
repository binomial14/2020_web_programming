//import uuidv4 from 'uuid/v4'
const Message = require('../models/message')

const Mutation = {
  createMessage: async (_, { name, body }, {pubsub}) => {
    const message = new Message({name, body});
    await message.save();
    
    pubsub.publish('message', {
      message: {
        mutation: 'CREATED',
        data: message
      }
    })
    
    return message;
  },
  deleteMessage: async (_, {id}) => {
      await Message.findByIdAndRemove(id);
      return "Message deleted";
  },
  deleteMessages: async () => {
    await Message.deleteMany({})
    
    return "Messages deleted";
  }
}

module.exports = Mutation
