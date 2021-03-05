const Mutation = {
    async createMsg(parent, args, {Message, pubsub}, info){
        const data = {
            ...args.data
        }
        await Message.insertMany([data], ()=>{})
        pubsub.publish(`${args.data.name}`, {
            post: {
              mutation: 'CREATED',
              data: data
            }
        })
        pubsub.publish(`${args.data.receiver}`, {
            post: {
              mutation: 'CREATED',
              data: data
            }
        })
        return data
    },

    async deleteMsg(parent, args, {Message, pubsub}, info){
        await Message.deleteMany({}, ()=>{})
        pubsub.publish('post', {
            post: {
              mutation: 'DELETED',
              data: null
            }
        })
        return 'Clear!'
    }
}
export {Mutation as default}