import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; 
import { Ionicons } from '@expo/vector-icons'; 
import request from "../utils/request";

export default function TableManagementScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(""); // 'add' or 'delete'
  const [tableId, setTableId] = useState("");
  const [type, setType] = useState("");
  const [cost, setCost] = useState("");

  const handleOpenModal = (type) => {
    setActionType(type);
    setModalVisible(true);
  };

  const handleAddTable = async () => {
    Alert.alert("Thông báo", "Thêm bàn thành công.");
    setModalVisible(false);

    try {
      const response = await request.post('/billiard_table/create', {
        type: type,
        costPerHour: cost
      });
      console.log("Bàn thêm: " + type + " " + cost + " " + response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTable = async () => {
    Alert.alert("Thông báo", "Xoá bàn thành công.");
    setModalVisible(false);

    try {
      const response = await request.delete(`/billiard_table/deleteById/${tableId}`);
      console.log("Bàn đã xóa với ID: " + tableId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.container}>
      {/* Nút quay về */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
      </TouchableOpacity>

      {/* Các nút Thêm và Xóa bàn */}
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => handleOpenModal("add")}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Thêm Bàn</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => handleOpenModal("delete")}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Xóa Bàn</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {actionType === "add" ? (
              <>
                <Text style={styles.modalTitle}>Thêm Bàn</Text>
                <TextInput
                  placeholder="Loại bàn"
                  placeholderTextColor="#999"
                  value={type}
                  onChangeText={setType}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Giá mỗi giờ"
                  placeholderTextColor="#999"
                  value={cost}
                  onChangeText={setCost}
                  style={styles.input}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleAddTable}
                >
                  <Text style={styles.modalButtonText}>Thêm</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Xóa Bàn</Text>
                <TextInput
                  placeholder="Nhập ID bàn cần xóa"
                  placeholderTextColor="#999"
                  value={tableId}
                  onChangeText={setTableId}
                  style={styles.input}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleDeleteTable}
                >
                  <Text style={styles.modalButtonText}>Xóa</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.modalButtonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
  buttonAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#34c759",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    width: 250,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  modalButton: {
    backgroundColor: "#007aff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalButtonClose: {
    backgroundColor: "#ff9500",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
