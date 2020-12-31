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


dxdRoutes.route('/Peerage/').get(function(req, res) {

  if(req.query.tenCo){
    console.log("Đã nhận câu hỏi của " + req.query.tenCo + "'s Peerage")
  }
  else{
    peerageModel.find({}, function(err, ketQuaTimPeerage){
      if (err) {
        console.log(err);
      }
      else {
        console.log('đã tìm thấy tất cả bàn cờ là: ', ketQuaTimPeerage);
        res.json(ketQuaTimPeerage)
        // res.json('đây là Peerage')
      }

      console.log("Đã nhận câu hỏi Peerage")
    
    
    })



  }

})




dxdRoutes.route('/Peerage/:tenCo').get(function(req, res) {
  console.log("Đã nhận câu hỏi của " + req.params.tenCo + "'s Peerage")

  // peerageModel.find({$or:[{peerage: "Sona's King"}]}, function(err, timCoCuaAiDo){
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     console.log('đã tìm thấy ', timCoCuaAiDo);
  //     // res.json(timCoCuaAiDo)
      
  //     var ketQua = {}
  //     if(req.params.tenCo==='Sona'){
  //       console.log('Sona')
  //       // req.params.tenCo == 'Sona'
  //       ketQua['King'] = timCoCuaAiDo[3]
  //       res.json(ketQua)
  //     }
  //     else{
  //       console.log('null')
  //       res.json(ketQua)
  //     }
      
  //     console.log('đã gửi kết quả về bàn cờ Sona')
  //   }

  // })

  var ketQua = {'King': {}, 'Queen': {}, 'Bishop': [], 'Knight': [], 'Rook': [], 'Pawn': []}

  let canTim = ''
  canTim = req.params.tenCo;

  peerageModel.find({$text: { $search: req.params.tenCo}}, function(err, timCoCuaAiDo){
    if (err) {
      console.log(err);
    }
    else{
      console.log('đã tìm thấy bàn cờ của 1 người là: ', timCoCuaAiDo);
      // req.params.tenCo == 'Rias'

//kiem tra nguoi dau tien trong Arrray Danh Sach
     
      //Neu ban co cua nguoi nay (dau tien) co chu King => TRUE   -----FALSE
      // if(...){
        //thi cho vao King cua Object KetQua to                         BO QUA
      // }
        
      // }else if
      //
      // }
      
      // nếu peerage có Issei's King là cờ vua của Issei
      // nếu peerage có Rias's Pawn là cờ vua của Rias
      // nếu peerage có Sona's Pawn là cờ vua của Sona





      //kiem tra nguoi thu 2 trong Arrray Danh Sach
     
      //Neu ban co cua nguoi nay (thu 2) co chu King =>          TRUE
      // if(...){
      //   //thi cho vao King cua Object KetQua to                 LAM VIEC NAY
      // }
      // else{

      // }



      
      for(var i = 0;  i < timCoCuaAiDo.length; i++){
        if(timCoCuaAiDo[i].peerage.includes(req.params.tenCo + "'s King")){
          ketQua['King'] = timCoCuaAiDo[i]
        }
        else if(timCoCuaAiDo[i].peerage.includes(req.params.tenCo + "'s Queen")){
          ketQua['Queen'] = timCoCuaAiDo[i]
        }
        else if(timCoCuaAiDo[i].peerage.includes(req.params.tenCo + "'s Bishop")){
          ketQua['Bishop'].push(timCoCuaAiDo[i])
          console.log(timCoCuaAiDo[i].name)
        }
        else if(timCoCuaAiDo[i].peerage.includes(req.params.tenCo + "'s Knight")){
          ketQua['Knight'].push(timCoCuaAiDo[i])
        }
        else if(timCoCuaAiDo[i].peerage.includes(req.params.tenCo + "'s Rook")){
          ketQua['Rook'].push(timCoCuaAiDo[i])
        }
        else if(timCoCuaAiDo[i].peerage.includes(req.params.tenCo + "'s Pawn x4") || timCoCuaAiDo[i].peerage.includes(req.params.tenCo + "'s Pawn")){
          ketQua['Pawn'].push(timCoCuaAiDo[i])
        }
        else{
          console.log('Không cho ' + timCoCuaAiDo[i].name + ' cho vào')
        }
      }





      res.json(ketQua)
      // console.log('đã gửi kết quả về bàn cờ Rias')
    }
  })





  // if(req.params.tenCo === 'Rias'){
  //   peerageModel.find({$or:[{peerage: "Rias's King"}, {peerage: "Rias's Queen"}, {peerage: "Rias's Pawn x4"}]}, function(err, timCoCuaAiDo){
  //     if (err) {
  //       console.log(err);
  //     }
  //     else{
  //       console.log('đã tìm thấy ', timCoCuaAiDo);
  //       console.log('Rias')
  //       // req.params.tenCo == 'Rias'
  //       ketQua['King'] = timCoCuaAiDo[2]
  //       ketQua['Queen'] = timCoCuaAiDo[0]
  //       ketQua['Pawn'] = timCoCuaAiDo[1]
  //       res.json(ketQua)
  //       console.log('đã gửi kết quả về bàn cờ Rias')
  //     }
  //   })
  
  // }

  // else if(req.params.tenCo === 'Sona'){
  //   peerageModel.find({$or:[{peerage: "Sona's King"}]}, function(err, timCoCuaAiDo){
  //     if(err) {
  //       console.log(err);
  //     }
  //     else{
  //       console.log('đã tìm thấy ', timCoCuaAiDo);
  //       console.log('Sona')
  //       // req.params.tenCo == 'Sona'
  //       ketQua['King'] = timCoCuaAiDo[0]
  //       res.json(ketQua)
  //       console.log('đã gửi kết quả về bàn cờ Sona')
        
  //     }
  //   })
  // }

  // else if(req.params.tenCo === 'Issei'){
  //   peerageModel.find({$or:[{peerage: "Issei's King"}]}, function(err, timCoCuaAiDo){
  //     if(err) {
  //       console.log(err);
  //     }
  //     else{
  //       console.log('đã tìm thấy ', timCoCuaAiDo);
  //       console.log('Issei')
  //       // req.params.tenCo == 'Issei'
  //       ketQua['King'] = timCoCuaAiDo[0]
  //       res.json(ketQua)
  //       console.log('đã gửi kết quả về bàn cờ Issei ')
        
  //     }
  //   })
  // }

  // else{
  //   console.log('Không có bàn cờ')
  //   res.json('Không có bàn cờ tên là ' + req.params.tenCo)
  // }

  




  // var ketQua = {}

  // ketQua['King'] = 'Rias'

  // ketQua['King'] = 'King: Rias, Gender là Female'
  // ketQua['Queen'] = 'Queen: Rias, Gender là Female'
  // ketQua['Pawn'] = 'Pawn: Issei, Gender là Male'

  // ketQua['King'] = {peerage: "Rias's King"}
  // ketQua['Queen'] = {peerage: "Rias's Queen"}
  // ketQua['Pawn'] = {peerage: "Rias's Pawn x4"}

  // ketQua['King'] = {name: 'Rias', gender: 'Female', image: 'https://static.wikia.nocookie.net/highschooldxd/images/6/6c/Riasg.jpg'}
  // ketQua['Queen'] = {name: 'Akeno', gender: 'Female', image: 'https://static.wikia.nocookie.net/highschooldxd/images/b/bd/Himejima_Akeno.jpg'}
  // ketQua['Pawn'] = {name: 'Issei', gender: 'Male', image: 'https://static.wikia.nocookie.net/highschooldxd/images/2/2f/Issei.jpg'}
  
  // ketQua['King'] = {name: Family_Peerage, gender: , image: }
  // ketQua['Queen'] = {name: , gender: , image: }
  // ketQua['Pawn'] = {name: , gender: , image: }

  // ketQua['Bishop'] = 'đây là tượng'
  // ketQua['Knight'] = 'đây là mã'
  // ketQua['Rook'] = 'đây là xe'

  // res.json(ketQua)


})





