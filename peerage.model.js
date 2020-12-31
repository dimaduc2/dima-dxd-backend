const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let PeerageModel = new Schema(
  {
    name: String,
    gender: String,
    love: [String],
    original: String,
    power: [String],
    peerage: [String],
    image: String
  }, 
  { collection: 'Family_Peerage'}           //tên của collection trong MongoDB
);
PeerageModel.index({name:'text', gender:'text', original:'text', peerage:'text'})
module.exports = mongoose.model('Family_Peerage', PeerageModel);