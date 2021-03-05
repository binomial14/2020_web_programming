const Subscription = {
    message: {
        subscribe(parent, args, { pubsub }, info) {
            // console.log(args.query)
            return pubsub.asyncIterator('message')
          }
    }
        
}
module.exports = Subscription