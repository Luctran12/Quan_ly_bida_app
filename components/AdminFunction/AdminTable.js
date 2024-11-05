import React, {useState} from "react";
import { View, Text, StyleSheet, ImageBackground,TouchableOpacity } from "react-native";
import UpdateTableModal from "./UpdateTableModal";
const AdminTable = ({ id, type, cost, status, onUpdateTable }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const getBackgroundColor = () => {
    switch (status) {
      case "Hỏng":
        return "#ffcccc"; 
      case "Đang sửa chữa":
        return "#d3d3d3"; 
      default:
        return "#F0FFFF"; 
    }
  };

  return (
    
    <View style={[styles.tableItem, { backgroundColor: getBackgroundColor(status) }]}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{alignItems: "center"}}>
          <Text style={styles.tableText}>Bàn {id}</Text>
        </View>
        
        <Text style={styles.typeText}>Loại: {type}</Text>
        <Text style={styles.costText}>Giá: {cost} VND/h</Text>
        <Text style={styles.statusText}>Trạng thái: {status}</Text>
      </TouchableOpacity>

      <UpdateTableModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpdate={onUpdateTable}
        tableId={id}
        initialCost={cost}
        initialStatus={status}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  tableItem: {
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    width: 170,
    height: 120,
    margin: 5
  },
  tableText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  typeText:{
    fontSize: 16,
    marginBottom: 5,
  },
  costText:{
    fontSize: 16,
    marginBottom: 5,
  },
  statusText:{
    fontSize: 16,
    marginBottom: 5,
  },
  tableID: {
    fontSize: 10, 
    fontWeight: "bold",
    
    color: "#333", 
  }, 
  cost: {
    fontSize: 16,
    textAlign: "center", 
    color: "#888", 
  },
});

export default AdminTable;
