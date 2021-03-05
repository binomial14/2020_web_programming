const Subscription = {
    post:{
        async subscribe(parent, args, { Message ,pubsub }, info) {
            return await pubsub.asyncIterator(`${args.query}`)
        }
    }
}
export {Subscription as default}