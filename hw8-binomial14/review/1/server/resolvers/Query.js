
const Query = {
    async msg(parent, args, {Message, pubsub}, info){
        let message = await Message.find();
        if (!args.query){
            return message
        }
        const data = message.filter(msg => {
            const bool = (msg.name.toLowerCase() === args.query.toLowerCase()) ||  (msg.receiver.toLowerCase() === args.query.toLowerCase())
            return bool
        })
        return data;
    }
}
export {Query as default}