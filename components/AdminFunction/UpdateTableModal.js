import React, { useState } from "react";
import { View, Text, Modal, TextInput, Button, StyleSheet } from "react-native";

const UpdateTableModal = ({ isVisible, onClose, onUpdate, tableId, initialCost, initialStatus }) => {
  const [newCost, setNewCost] = useState(initialCost);
  const [newStatus, setNewStatus] = useState(initialStatus);

  const handleUpdate = () => {
    onUpdate(tableId, newCost, newStatus);
    onClose(); 
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Cập nhật Bàn {tableId}</Text>
          <TextInput
            style={styles.input}
            value={newCost}
            onChangeText={setNewCost}
            placeholder="Nhập giá mới"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={newStatus}
            onChangeText={setNewStatus}
            placeholder="Nhập trạng thái mới"
          />
          <Button title="Cập nhật" onPress={handleUpdate} />
          <Button title="Hủy" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default UpdateTableModal;
