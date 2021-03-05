const { async } = require('q');
const Message = require('../models/message')

const Mutation = {
    createMessage: async(_, {name, body}, {pubsub}) => {
        const message = new Message({name, body});
        await message.save();

        pubsub.publish("message", {
            message: {
                mutation: "CREATED",
                data: message
            }
        })
        return message;
    },
    
    deleteMessage: async(_, {id}) => {
        await Message.findByIdAndRemove(id);
        return "Deletion Completed!";
    },

    deleteAll: async () => {
        await Message.deleteMany({})
        return "Delete All!";
    }
}

module.exports = Mutation