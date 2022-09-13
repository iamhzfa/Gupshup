const mongoose = require('mongoose');
// const {Schema} = mongoose;

const messageSchema = new mongoose.Schema({
    message : String,
    name : String,
    received: Boolean
},
{timestamps:true}
);

const messagemodel = mongoose.model('messages', messageSchema); 
module.exports = messagemodel;