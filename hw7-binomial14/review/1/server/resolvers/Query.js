const { async } = require('q');
const Message = require('../models/message')

const Query = {
    getMessage: async(_,{name}) => {
        var result = await Message.find({"name": name});
        return result;
    },
    getAll: async() => {
        var result = await Message.find();
        return result;
    }
}

module.exports = Query