import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

export default function ChangeOrCheckoutModal({
  visible,
  handlCheckout,
  elapsedTime,
  handleResetAllStatus,
  onClose,
  id,
  handleSelect,
  startTime,
  handleChangeTable,
  handleResetAllStatuss,
}) {
  const [changeTableVisible, setChangeTableVisible] = useState(false);
  const [idChangeTable, setIdChangeTable] = useState(0);

  const handleChangeTables = () => {
    onClose();
    setChangeTableVisible(false);
    handleSelect(idChangeTable, startTime);
    handleChangeTable(idChangeTable);
    handleResetAllStatuss();
  };

  const handleChangeTableButton = () => {
    setChangeTableVisible(true);
    onClose();
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Bạn muốn chuyển bàn hay thanh toán?</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={handleChangeTableButton}
                style={[styles.button, styles.changeTableButton]}
              >
                <Text style={styles.buttonText}>Chuyển bàn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlCheckout}
                style={[styles.button, styles.checkoutButton]}
              >
                <Text style={styles.buttonText}>Thanh toán</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={changeTableVisible} transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.changeTableModal}>
            <Text style={styles.changeTableTitle}>Chuyển sang bàn số: </Text>
            <TextInput
              style={styles.input}
              onChangeText={(idTable) => setIdChangeTable(idTable)}
              keyboardType="numeric"
              placeholder="Số bàn"
            />
            <TouchableOpacity onPress={handleChangeTables} style={styles.changeButton}>
              <Text style={styles.buttonText}>Chuyển</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10, // Hiệu ứng bóng
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  button: {
    height: 40,
    width: "45%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  changeTableButton: {
    backgroundColor: "#3498db",
  },
  checkoutButton: {
    backgroundColor: "#e74c3c",
  },
  backButton: {
    backgroundColor: "#95a5a6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  changeTableModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    width: 300,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  changeTableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#ecf0f1",
    padding: 10,
    width: 100,
    borderRadius: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  changeButton: {
    backgroundColor: "#1bafc8",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
