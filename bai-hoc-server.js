// đây là Express - Web Server cho website pokedex
const express = require('express');		    //phải mượn Express
const baiHocRoutes = express.Router();	    //tạo Router để nhận tất cả câu hỏi

const app = express();
app.use(express.json())

const cors = require('cors');
app.use(cors());

app.use('/baiHoc', baiHocRoutes);		        //bảo Router chỉ nhận câu hỏi bắt đầu ‘/hanhDong



const PORT = 5500;











// server bắt đầu nghe và đợi câu hỏi ở phòng PORT 5500
app.listen(PORT, function() {		          //chạy Web Server ở địa chỉ phòng này
  console.log("đã bắt đầu server của bai hoc đang đợi câu hỏi và ở phòng Port: " + PORT);
});

baiHocRoutes.route('/').get(function(req, res) {
  res.send('câu trả lời / của router');
  console.log('câu trả lời / của router')
})

app.get('/', (req, res) => {
  res.send('câu trả lời / của app')
  console.log('câu trả lời / của app');
})


baiHocRoutes.route('/chao/').get(function(req, res) {
  res.json('Xin chào Dima, đây là Server bài học');
  console.log('Xin chào Dima, đây là Server bài học');
})


baiHocRoutes.route('/aiDo/').get(function(req, res) {
  res.json('Tôi ko biết tên bạn là gì');
  console.log('Tôi ko biết tên bạn là gì');
})
var ABCDEF='Dima'
baiHocRoutes.route('/aiDo/'+ABCDEF).get(function(req, res) {
  res.json('Xin chào '+so1);
  console.log('Xin chào '+so1);
})


  
// var ABCDEF=
// baiHocRoutes.route('/aiDo/'+ABCDEF).get(function(req, res) {

//   if(ABCDEF='Dima'){
//     // res.json('Tôi ko biết tên bạn là gì');
//     res.json('Xin chào '+ABCDEF);
    
//   }else{
//     // res.json('Xin chào '+ABCDEF);
//     res.json('Tôi ko biết tên bạn là gì');
    
//   }

// })


  // if(ABCDEF=''){
  //   baiHocRoutes.route('/aiDo/'+ABCDEF).get(function(req, res) {
  //   res.json('Tôi ko biết tên bạn là gì');
  //   })
  // }else if(ABCDEF=ABCDEF){
  //   baiHocRoutes.route('/aiDo/'+ABCDEF).get(function(req, res) {
  //   res.json('Xin chào '+ABCDEF);
  //   })
  // }




var tenBaiTap = ['tạo Database', 'tạo Server mới', 'thêm thông tin vào Server'];

baiHocRoutes.route('/baiTap/0').get(function(req, res) {
  res.send(tenBaiTap[0])
})
baiHocRoutes.route('/baiTap/1').get(function(req, res) {
  res.send(tenBaiTap[1])
})
baiHocRoutes.route('/baiTap/2').get(function(req, res) {
  res.send(tenBaiTap[2])
})

// if(soArray = '0'){
//   var soArray = '0'
//   baiHocRoutes.route('/baiTap/'+soArray).get(function(req, res) {
//     res.send(tenBaiTap[soArray])
//   })
// }
// if(soArray = '1'){
//   var soArray = '1'
//   baiHocRoutes.route('/baiTap/'+soArray).get(function(req, res) {
//     res.send(tenBaiTap[soArray])
//   })
// }
// if(soArray = '2'){
//   var soArray = '2'
//   baiHocRoutes.route('/baiTap/'+soArray).get(function(req, res) {
//     res.send(tenBaiTap[soArray])
//   })
// }


// for(var soArray = 0; soArray<=tenBaiTap.length; soArray++){
//   if(soArray = '0'){
//     baiHocRoutes.route('/baiTap/'+0).get(function(req, res) {
//       res.send(tenBaiTap[soArray])
//     })
//   }
// }