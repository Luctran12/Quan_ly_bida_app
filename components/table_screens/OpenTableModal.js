import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function OpenTableModal({
  onClose,
  visible,
  tableName,
  onAcceptPress,
}) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Xác nhận đặt bàn {tableName}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onAcceptPress}
                style={[styles.button, styles.confirmButton]}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ phía sau modal
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
    elevation: 10, // Tạo hiệu ứng bóng
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    height: 40,
    width: "45%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  confirmButton: {
    backgroundColor: "#27ae60", // Màu xanh cho nút xác nhận
  },
  cancelButton: {
    backgroundColor: "#e74c3c", // Màu đỏ cho nút hủy
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
