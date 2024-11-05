
// import React from 'react'
// import { Modal, Text, View,Button } from 'react-native'


// export const BillModal = ( {visible, startTimeReq, startTime, elapsedTime, foodData, checkoutAndTurnOffModal}) => {
  
//     function convertMillisecondsToTime(ms) {
//         let date = new Date(ms);
    
//         // Cộng thêm 7 giờ để chuyển từ UTC sang giờ Việt Nam
//         let hours = date.getUTCHours() + 7;
    
//         // Xử lý khi số giờ vượt quá 24 hoặc âm
//         if (hours >= 24) {
//           hours -= 24; // Điều chỉnh để đảm bảo giờ nằm trong khoảng 0-23
//         } else if (hours < 0) {
//           hours += 24; // Điều chỉnh khi giờ nhỏ hơn 0
//         }
    
//         let minutes = date.getUTCMinutes();
//         let seconds = date.getUTCSeconds();
    
//         // Tạo chuỗi thời gian định dạng hh:mm:ss
//         let time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//           2,
//           "0"
//         )}:${String(seconds).padStart(2, "0")}`;
//         console.log("ham convert: " + time);
//         return time;
//       }

//       function convertElapsedToTime(ms) {
//         let date = new Date(ms);
    
//         let hours = date.getUTCHours(); // Giờ UTC
//         let minutes = date.getUTCMinutes();
//         let seconds = date.getUTCSeconds();
//         let time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//           2,
//           "0"
//         )}:${String(seconds).padStart(2, "0")}`;
//         console.log(typeof time);
//         return time;
//       }

//     return (
//     <View>
//         <Modal visible={visible} transparent={true}>
//       <View style={{flex:1,justifyContent:'center'}}>
//       <View style={{backgroundColor:'red', height:'70%'}}>
//       <Text style={{display:'flex',fontSize:20, color:'white' }}>Thông tin Bill</Text>
//       <Text style={{display:'flex',fontSize:20, color:'white' }}>Thời gian bắt đầu: {convertMillisecondsToTime(startTime)}</Text>
//       <Text style={{display:'flex',fontSize:20, color:'white' }}>Thời gian kết thúc: {convertMillisecondsToTime(startTime + elapsedTime)}</Text>
//       <Text style={{display:'flex',fontSize:20, color:'white' }}>Tổng thời gian chơi: {convertElapsedToTime(elapsedTime)}</Text>
//       <Text style={{display:'flex',fontSize:20, color:'white' }}>Món ăn: </Text>
//       <Text style={{display:'flex',fontSize:20, color:'white' }}>Tiền thức ăn:  </Text>
      
//       { foodData.map((item, index) => (
//   <View key={index}>
//     <Text>Tên {item.food.name}</Text>
//     <Text>Giá: {item.food.cost}</Text>
//     <Text>Số lượng {item.quantity}</Text>
//   </View>
// )) }


      
      
//       <Button title="Hoan thanh" onPress={ checkoutAndTurnOffModal}/>
//       <Button title="Huỷ" onPress={() => setBillVisiable(false)}/>
//       </View>
//       </View>
      
      
//      </Modal>
//     </View>

//   )
// }
import React from 'react';
import { Modal, Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { useOrder } from '../context/OrderContext';
export const BillModal = ({ 
    visible, 
    startTime, 
    elapsedTime, 
    foodData, 
    checkoutAndTurnOffModal, 
    totalCash,
}) => {
  const {orderId,tableId} = useOrder()

  function convertMillisecondsToTime(ms) {
    let date = new Date(ms);
    let hours = date.getUTCHours() + 7;
    if (hours >= 24) hours -= 24;
    else if (hours < 0) hours += 24;
    let minutes = date.getUTCMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  function convertElapsedToTime(ms) {
    let date = new Date(ms);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  const renderFoodItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}. {item.food.name}</Text>
      <Text style={styles.cell}>{item.food.cost.toLocaleString()} đ</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={styles.cell}>{(item.food.cost * item.quantity).toLocaleString()} đ</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.billContainer}>
          <Text style={styles.title}>Hoá đơn</Text>
          <View style={styles.row}>
            <Text style={{fontWeight:"bold"}}>Bàn {tableId}</Text>
            <Text>Mã: HD{orderId}</Text>
          </View>
          <Text style={{marginBottom: 2}}>Thời gian bắt đầu: {convertMillisecondsToTime(startTime)}</Text>
          <Text style={{marginBottom: 2}}>Thời gian kết thúc: {convertMillisecondsToTime(startTime+elapsedTime)}</Text>
          <Text style={{marginBottom: 10}}>Tổng thời gian chơi: {convertElapsedToTime(elapsedTime)}</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Món ăn</Text>
            <Text style={styles.headerCell}>Giá</Text>
            <Text style={styles.headerCell}>Số lượng</Text>
            <Text style={styles.headerCell}>Thành tiền</Text>
          </View>

          <FlatList
            data={foodData}
            renderItem={renderFoodItem}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Tổng tiền món ăn:</Text>
            <Text style={styles.totalAmount}>{foodData.reduce((total, item) => total + item.food.cost * item.quantity, 0).toLocaleString()} đ</Text>
          </View>


          <View style={styles.total}>
            <Text style={styles.totalAmountLabel}>Tổng thanh toán: {totalCash} đ</Text>
          </View>

          <Text style={styles.footer}>Xin cam on quy khach!</Text>
          
          <View style={styles.buttonContainer}>
            <Button title="Hoàn thành" onPress={checkoutAndTurnOffModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  billContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginRight: 43
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  totalLabel: {
    fontWeight: 'bold',
    flex: 3,
    textAlign: 'right',
    paddingRight: 10,
  },
  totalAmount: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  totalAmountLabel: {
    fontWeight: 'bold',
    flex: 3,
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 16,
  },
  totalAmountValue: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 15,
  },
});

