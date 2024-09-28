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
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Trạng thái bàn</Text>
      <ImageBackground
      source={require('../../assets/bida/bidascreen.jpg')}
      style={styles.backgroundImage}
    >
      
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

      {/* Modal cập nhật trạng thái */}
      {selectedTable && (
        <UpdateStatusModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Modal cập nhật giá */}
      {selectedTable && (
        <UpdateCostModal
          visible={costModalVisible}
          onClose={handleCloseCostModal}
          currentCost={selectedTable.cost}
          onUpdateCost={handleUpdateCost}
        />
      )}
      </ImageBackground>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
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
    
    resizeMode: 'contain', // Chỉnh sửa tỷ lệ hình ảnh để nó phù hợp với màn hình
  },
});
