const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let PeopleModel = new Schema(
  {
    name: String,
    gender: String,
    love: [String],
    original: String,
    power: [String],
    peerage: [String],
    image: String
  }, 
  {collection: 'People'}           //tên của collection trong MongoDB
);
PeopleModel.index({name:'text', gender:'text', original:'text', peerage:'text'})
module.exports = mongoose.model('People', PeopleModel);