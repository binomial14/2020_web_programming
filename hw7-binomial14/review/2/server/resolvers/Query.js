const Message = require('../models/message')

const Query = {
  //parent, args, { db }, info
  getMessages:async () =>{
    var result = await Message.find();
    return result;
  } ,
  getMessage: async (_,{name}) => {
    var result = await Message.find({"name":name});
    return result;
  }
}
module.exports = Query

