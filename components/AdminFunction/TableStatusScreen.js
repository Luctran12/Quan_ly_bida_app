<<<<<<< HEAD
import React from "react";
import { FlatList,Text, SafeAreaView,StyleSheet, View } from "react-native";
import TableData from "./TableData";
import AdminTable from "./AdminTable";


export default function TableStatusScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Trạng thái bàn</Text>
      <FlatList
        data={TableData}
        keyExtractor={(item) => item.id.toString()}
        
        renderItem={({ item }) => (
          <AdminTable
            id={item.id}
            type={item.type}
            cost={item.cost}
            status={item.status} 
          />
        )}
      />
    </SafeAreaView>
  );
}
const styles= StyleSheet.create({
    container: {
        padding:20,
        marginLeft: 20,
        alignItems: "center"
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 5,
    }
})
=======
import React, { useState } from "react";
import { FlatList, Text, SafeAreaView, StyleSheet,ImageBackground, View, TouchableOpacity } from "react-native";
import TableData from "./TableData";
import AdminTable from "./AdminTable";
import UpdateCostModal from "./UpdateCostModal"; // Import modal cập nhật giá
import UpdateStatusModal from "./UpdateStatusModal"; // Import modal cập nhật trạng thái

export default function TableStatusScreen() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [costModalVisible, setCostModalVisible] = useState(false);
  const [tableData, setTableData] = useState(TableData);

  const handleOpenModal = (table) => {
    setSelectedTable(table);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTable(null);
  };

  const handleOpenCostModal = () => {
    setCostModalVisible(true);
  };

  const handleCloseCostModal = () => {
    setCostModalVisible(false);
  };

  const handleUpdateCost = (newCost) => {
    const updatedData = tableData.map((table) =>
      table.id === selectedTable.id ? { ...table, cost: newCost } : table
    );
    setTableData(updatedData);
    handleCloseCostModal(); // Đóng modal sau khi cập nhật
  };

  const handleUpdateStatus = (newStatus) => {
    const updatedData = tableData.map((table) =>
      table.id === selectedTable.id ? { ...table, status: newStatus } : table
    );
    setTableData(updatedData);
    handleCloseModal(); // Đóng modal sau khi cập nhật
  };

  return (
    <ImageBackground
      source={require('../../assets/bida/bidascreen.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
    <View style={styles.container}>
      <Text style={styles.header}>Trạng thái bàn</Text>
      
      
      <FlatList
        data={tableData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <AdminTable
              id={item.id}
              type={item.type}
              cost={item.cost}
              status={item.status}
            />
          </TouchableOpacity>
        )}
      />
{/* 
      {selectedTable && (
        <UpdateStatusModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )} */}

      {/* Modal cập nhật giá */}
      {/* {selectedTable && (
        <UpdateCostModal
          visible={costModalVisible}
          onClose={handleCloseCostModal}
          currentCost={selectedTable.cost}
          onUpdateCost={handleUpdateCost}
        />
      )} */}
      
    </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 5,
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
>>>>>>> Long
