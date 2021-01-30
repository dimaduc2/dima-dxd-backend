// đây là Express - Web Server cho website dima-dxd
const express = require('express');		    //phải mượn Express
const dxdRoutes = express.Router();	    //tạo Router để nhận tất cả câu hỏi

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');     //phải mượn Mongoose
                                          //tìm và nói chuyện với MongoDB ở địa chỉ của nó
const PORT = 5100;				                //địa chỉ Phòng

app.use(cors());
app.use(bodyParser.json());
app.use('/dxd', dxdRoutes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong

let peopleModel = require('./people.model');
let peerageModel = require('./peerage.model');

mongoose.connect('mongodb+srv://dima:dimaduc@cluster0.ufom0.mongodb.net/dima-dxd-db?retryWrites=true&w=majority', { useNewUrlParser: true })
        .catch(error => console.log('không kết nối được với mongoDB: ' + error));
        // nếu không kết nối được thì thông báo lỗi
const connection = mongoose.connection; //  <=> giữa server và DB

// sau đó, mở kết nối để 2 bên nói chuyện
// hiện ra, thông báo là nói chuyện đc rồi
connection.once('open', function() {
  console.log("Đã nói chuyện với MongoDB");
})

// server bắt đầu nghe và đợi câu hỏi ở phòng PORT 5100
app.listen(PORT, function() {		          //chạy Web Server ở địa chỉ phòng này
  console.log("dima-dxd-server đang chạy ở phòng Port: " + PORT);
});


dxdRoutes.route('/Peerage/xoa/:tenBanCo').get(function(req, res) {
  let id = req.query.idMuonXoa;
  let tenCoCuaAiDo = req.params.tenBanCo;
  console.log('Đã nhận câu hỏi: Browser muốn xóa là: ' + id + ', Sau đó tìm danh sách mới liên quan đến ' + tenCoCuaAiDo);


  // dxdRoutes.route('/Peerage/xoa').get(function(req, res) {
  //   let id = req.query.idMuonXoa;
  //   let tenCoCuaAiDo = req.query.tenCoCuaAiDo;
  //   console.log('Đã nhận câu hỏi: Browser muốn xóa là: ' + id + ', Sau đó tìm danh sách mới liên quan đến ' + tenCoCuaAiDo);

  peopleModel.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('đã xóa ' + id);
      
      var ketQua = {'King': {}, 'Queen': {}, 'Bishop': [], 'Knight': [], 'Rook': [], 'Pawn': []}
      
      peopleModel.find({$text: {$search: tenCoCuaAiDo}}, function(err, timCoCuaAiDo){
        if (err) {
          console.log(err);
        }
        else{          
          // console.log('đã tìm thấy bàn cờ của 1 người là: ', timCoCuaAiDo);
          for(var i = 0;  i < timCoCuaAiDo.length; i++){
            if(timCoCuaAiDo[i].peerage.includes(tenCoCuaAiDo + "'s King")){
              ketQua['King'] = timCoCuaAiDo[i]
            }
            else if(timCoCuaAiDo[i].peerage.includes(tenCoCuaAiDo + "'s Queen")){
              ketQua['Queen'] = timCoCuaAiDo[i]
            }
            else if(timCoCuaAiDo[i].peerage.includes(tenCoCuaAiDo + "'s Bishop")){
              ketQua['Bishop'].push(timCoCuaAiDo[i])
              console.log(timCoCuaAiDo[i].image)
            }
            else if(timCoCuaAiDo[i].peerage.includes(tenCoCuaAiDo + "'s Knight")){
              ketQua['Knight'].push(timCoCuaAiDo[i])
            }
            else if(timCoCuaAiDo[i].peerage.includes(tenCoCuaAiDo + "'s Rook")){
              ketQua['Rook'].push(timCoCuaAiDo[i])
            }
            else if(timCoCuaAiDo[i].peerage.includes(tenCoCuaAiDo + "'s Pawn x4") || timCoCuaAiDo[i].peerage.includes(tenCoCuaAiDo + "'s Pawn")){
              ketQua['Pawn'].push(timCoCuaAiDo[i])
            }
            else{
              console.log('Không cho ' + timCoCuaAiDo[i].name + ' cho vào')
            }
          }
          res.json(ketQua)
          console.log('Đã gửi sau khi xóa '+ketQua)
        }
      })
    }
  });
})

dxdRoutes.route('/Peerage/add').post(function(req, res) {
  let peerageMoi = new peopleModel(req.body);
  
  peerageMoi.save()
            .then(peerageMoi => {
              // console.log('đã cho thêm tên peerage mới: ' + peerageMoi.name);
                res.json('đã cho thêm ' + peerageMoi.name + ' trong bàn cờ của ' + peerageMoi.peerage)
            })

  //req.body  Thông tin
  console.log(
    
    'đã nhận câu hỏi thêm mới tên là: ' 
    +'\n'+
    'Name: ' + req.body.name
    +'\n'+
    'Gender: ' + req.body.gender
    +'\n'+
    'Love: ' + req.body.love
    +'\n'+
    'Original: ' + req.body.original
    +'\n'+
    'Power :' + req.body.power
    +'\n'+
    'Peerage: ' + req.body.peerage
    +'\n'+
    'Image: ' + req.body.image
  );
});

dxdRoutes.route('/Peerage/').get(function(req, res) {
 // res.json('Tất cả bàn cờ')
  peerageModel.find({}, function(err, ketQuaTimPeerage){
    if (err) {
      console.log(err);
    }
    else {
      // console.log(ketQuaTimPeerage);
      res.json(ketQuaTimPeerage)
    }
  })


  // peopleModel.find({}, function(err, ketQuaTimPeople){
    // if (err) {
    //   console.log(err);
    // }
    // else {
    //   // console.log('đã tìm thấy tất cả bàn cờ là: ', ketQuaTimPeople);
    // res.json(ketQuaTimPeople)
    //   // res.json('đây là Peerage')
    // }
    // console.log("Đã nhận câu hỏi Peerage")
  // })
})

dxdRoutes.route('/Peerage/:tenCo').get(function(req, res) {

  var ketQua = {'King': {}, 'Queen': {}, 'Bishop': [], 'Knight': [], 'Rook': [], 'Pawn': []}

  let canTim = ''
  let tenCo = req.params.tenCo
  canTim = tenCo;

  console.log("Đã nhận câu hỏi của " + tenCo + "'s Peerage")

  peopleModel.find({$text: { $search: tenCo}}, function(err, timCoCuaAiDo){
    if (err) {
      console.log(err);
    }
    else{
      // console.log('đã tìm thấy bàn cờ của 1 người là: ', timCoCuaAiDo);
      
      for(var i = 0;  i < timCoCuaAiDo.length; i++){
        if(timCoCuaAiDo[i].peerage.includes(tenCo + "'s King")){
          ketQua['King'] = timCoCuaAiDo[i]
        }
        else if(timCoCuaAiDo[i].peerage.includes(tenCo + "'s Queen")){
          ketQua['Queen'] = timCoCuaAiDo[i]
        }
        else if(timCoCuaAiDo[i].peerage.includes(tenCo + "'s Bishop")){
          ketQua['Bishop'].push(timCoCuaAiDo[i])
          console.log(timCoCuaAiDo[i].image)
        }
        else if(timCoCuaAiDo[i].peerage.includes(tenCo + "'s Knight")){
          ketQua['Knight'].push(timCoCuaAiDo[i])
        }
        else if(timCoCuaAiDo[i].peerage.includes(tenCo + "'s Rook")){
          ketQua['Rook'].push(timCoCuaAiDo[i])
        }
        else if(timCoCuaAiDo[i].peerage.includes(tenCo + "'s Pawn x4") || timCoCuaAiDo[i].peerage.includes(tenCo + "'s Pawn")){
          ketQua['Pawn'].push(timCoCuaAiDo[i])
        }
        else{
          console.log('Không cho ' + timCoCuaAiDo[i].name + ' cho vào')
        }
      }



      res.json(ketQua)
    }
  })








})