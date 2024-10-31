import React from 'react';
import { View, StyleSheet, Modal, TextInput, Button, Text, Dimensions } from 'react-native';

export default function FoodModal({
    isVisible,
    quantity,
    setQuantity,
    table,
    setTable,
    onCancel,
    onConfirm,
    nameFood,
})  {
    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            transparent={true}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Text style={styles.textFood}>Bạn đã chọn {nameFood.toLowerCase()}</Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Vui lòng nhập số lượng"
                        placeholderTextColor="#7f8c8d"
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={setQuantity}
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Vui lòng nhập số bàn"
                        placeholderTextColor="#7f8c8d"
                        keyboardType="numeric"
                        value={table}
                        onChangeText={setTable}
                    />
                    
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Thêm món"
                            onPress={onConfirm}
                            color="#27ae60"
                        />
                        <Button
                            title="Huỷ"
                            onPress={onCancel}
                            color="#e74c3c"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popup: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    textFood: {
        color: "#2c3e50",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 8,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
});
