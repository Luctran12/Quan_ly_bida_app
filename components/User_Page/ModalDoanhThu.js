import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export const ModalDoanhThu = ({ id, orderId, date, startTime, endTime, totalCost, order, totalTime, show, setShow }) => {
  const[foodCost,setFoodCost] = useState(0);
  // Hàm render từng món ăn trong hóa đơn
  const renderFoodItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell} > {item.food.name}</Text>
      <Text style={styles.cell}>{item.food.cost.toLocaleString()} đ</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={{ marginLeft: 10 }}>{(item.food.cost * item.quantity).toLocaleString()} đ</Text>
      {console.log('=====>abcdef' + item.food.name)}
    </View>
  );

  useEffect(() => {
    console.log("=====>, items order:", order);
  }, []);

  const calculateFoodCost = () => {
   
    const cost = order
      .reduce(
        (total, item) => total + item.food.cost * item.quantity,
        0
      )
      console.log("==========>",typeof cost)
      
      return cost;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Hoá đơn</Text>
          <Text>Bàn {id} - Mã: HD{orderId}</Text>
          <Text>Thời gian bắt đầu: {startTime}</Text>
          <Text>Thời gian kết thúc: {endTime}</Text>
          <Text>Tổng thời gian chơi: {totalTime}</Text>
          <Text>Tiền bàn: {(totalCost - calculateFoodCost()).toLocaleString()} d</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Món ăn</Text>
            <Text style={styles.headerCell}>Giá</Text>
            <Text style={styles.headerCell}>Số lượng</Text>
            <Text style={styles.headerCell}>Thành tiền</Text>
          </View>

          {/* Hiển thị danh sách các món ăn trong hóa đơn */}
          <FlatList
            data={order}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{marginRight:20}}>Tổng tiền thức ăn:</Text>

            <Text style={styles.totalAmount}>
              {calculateFoodCost(order)
                .toLocaleString()}{" "}
              đ
            </Text>
          </View>

          <Text style={styles.totalLabel}>Tổng thanh toán: {totalCost.toLocaleString()} đ</Text>

          <TouchableOpacity onPress={() => setShow(false)} style={styles.closeButton}>
            <Text style={{ color: 'white' }}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cell: {

    //color:"blue",
    textAlign: 'center',
    marginRight: 25
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
  },
});