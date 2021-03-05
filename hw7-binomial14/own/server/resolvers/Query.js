const Query = {
    message: async (parent, args, { Message }, info) => {
        console.log(args.query)
        return await Message.find(args.query).then((messages) => {
            return messages
        });
      },
}
module.exports = Query