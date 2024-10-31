
import React from 'react'
import { Modal, Text, View,Button } from 'react-native'


export const BillModal = ( {visible, startTimeReq, startTime, elapsedTime, foodData, checkoutAndTurnOffModal}) => {
  
    function convertMillisecondsToTime(ms) {
        let date = new Date(ms);
    
        // Cộng thêm 7 giờ để chuyển từ UTC sang giờ Việt Nam
        let hours = date.getUTCHours() + 7;
    
        // Xử lý khi số giờ vượt quá 24 hoặc âm
        if (hours >= 24) {
          hours -= 24; // Điều chỉnh để đảm bảo giờ nằm trong khoảng 0-23
        } else if (hours < 0) {
          hours += 24; // Điều chỉnh khi giờ nhỏ hơn 0
        }
    
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();
    
        // Tạo chuỗi thời gian định dạng hh:mm:ss
        let time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;
        console.log("ham convert: " + time);
        return time;
      }

      function convertElapsedToTime(ms) {
        let date = new Date(ms);
    
        let hours = date.getUTCHours(); // Giờ UTC
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();
        let time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;
        console.log(typeof time);
        return time;
      }

    return (
    <View>
        <Modal visible={visible} transparent={true}>
      <View style={{flex:1,justifyContent:'center'}}>
      <View style={{backgroundColor:'red', height:'70%'}}>
      <Text style={{display:'flex',fontSize:20, color:'white' }}>Thông tin Bill</Text>
      <Text style={{display:'flex',fontSize:20, color:'white' }}>Thời gian bắt đầu: {convertMillisecondsToTime(startTime)}</Text>
      <Text style={{display:'flex',fontSize:20, color:'white' }}>Thời gian kết thúc: {convertMillisecondsToTime(startTime + elapsedTime)}</Text>
      <Text style={{display:'flex',fontSize:20, color:'white' }}>Tổng thời gian chơi: {convertElapsedToTime(elapsedTime)}</Text>
      <Text style={{display:'flex',fontSize:20, color:'white' }}>Món ăn: </Text>
      <Text style={{display:'flex',fontSize:20, color:'white' }}>Tiền thức ăn:  </Text>
      
      { foodData.map((item, index) => (
  <View key={index}>
    <Text>Tên {item.food.name}</Text>
    <Text>Giá: {item.food.cost}</Text>
    <Text>Số lượng {item.quantity}</Text>
  </View>
)) }


      
      
      <Button title="Hoan thanh" onPress={ checkoutAndTurnOffModal}/>
      {/* <Button title="Huỷ" onPress={() => setBillVisiable(false)}/> */}
      </View>
      </View>
      
      
     </Modal>
    </View>

  )
}
