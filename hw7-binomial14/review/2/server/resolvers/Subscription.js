const Message = require('../models/message')

const Subscription = {

    message: {
      subscribe(parent, args, { pubsub }, info) {
        return pubsub.asyncIterator('message')
      }
    }
}
module.exports = Subscription
  