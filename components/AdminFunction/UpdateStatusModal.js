import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const UpdateStatusModal = ({ visible, onClose, onUpdateStatus }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cập nhật trạng thái bàn</Text>

          <View style={styles.buttonGroup}>
            <Button title="Bình thường" onPress={() => onUpdateStatus('Bình thường')} />
            <Button title="Đang sửa chữa" onPress={() => onUpdateStatus('Đang sửa chữa')} />
            <Button title="Hỏng" onPress={() => onUpdateStatus('Hỏng')} />
          </View>

          <Button title="Đóng" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonGroup: {
    marginBottom: 20,
  },
});

export default UpdateStatusModal;
