import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export const ModalDoanhThu = ({ id, orderId, date, startTime, endTime, totalCost, orderFoodItems, totalTime, show, setShow }) => {
  // Hàm render từng món ăn trong hóa đơn
  const renderFoodItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}. {item.food.name}</Text>
      <Text style={styles.cell}>{item.food.cost.toLocaleString()} đ</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={styles.cell}>{(item.food.cost * item.quantity).toLocaleString()} đ</Text>
      {console.log('=====>'+item.food.name)}
    </View>
  );

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

          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Món ăn</Text>
            <Text style={styles.headerCell}>Giá</Text>
            <Text style={styles.headerCell}>Số lượng</Text>
            <Text style={styles.headerCell}>Thành tiền</Text>
          </View>

          {/* Hiển thị danh sách các món ăn trong hóa đơn */}
          <FlatList
            data={orderFoodItems}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
          />

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
    flex: 1,
    textAlign: 'center',
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
