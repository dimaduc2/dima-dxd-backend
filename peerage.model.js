const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//tạo 1 Schema Model (giả)
let PeerageModel = new Schema(
  {
    name: String,
    image: String,
    nameColor: String,
    imageColor: String,
  },
  {collection: 'Peerage'}
);
PeerageModel.index({name:'text', image:'text', nameColor:'text', imageColor:'text'})
module.exports = mongoose.model('Peerage', PeerageModel);