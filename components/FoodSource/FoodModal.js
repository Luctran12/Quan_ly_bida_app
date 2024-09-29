import React from 'react';
import { View, StyleSheet, Modal, TextInput, Button,Platform, Text, Dimensions } from 'react-native';

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
    //const nameDisplay= nameFood.toLowerCase();
    return (
        
        <Modal
            animationType="slide"
            visible={isVisible}
            transparent={true}
            onRequestClose={true}
        >
            <View style={styles.popup}>
                <View style={styles.textFoodContainer}>
                <Text style={styles.textFood}>Bạn đã chọn {nameFood.toLowerCase()}</Text>
                </View>
            
                <View style={styles.inputQuantityContainer}>
                    
                <TextInput
                    style={styles.inputQuantity}
                    placeholder="Vui lòng nhập số lượng"
                    placeholderTextColor="#3399CC"
                    keyboardType="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                />
                </View>
                <View style={styles.inputTableNumContainer}>
                <TextInput
                    style={styles.inputTableNum}
                    placeholder="Vui lòng nhập số bàn"
                    placeholderTextColor="#3399CC"
                    keyboardType="numeric"
                    value={table}
                    onChangeText={setTable}
                />
                </View>
                <View style={styles.buttonInPopup}>
                    <Button
                        title="Thêm món"
                        onPress={onConfirm}
                    />
                    <Button
                        title="Huỷ"
                        onPress={onCancel}
                        color="red"
                    />
                </View>
            </View>
        </Modal>
    );
};




const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    input: {
        fontSize: 15,
        padding: 10,
        marginVertical: 10,
    },
    popup:{
        backgroundColor:"#FFFFFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2ecc71",
        // height: Platform.OS === "android" ? "30%" : "25%",
        // width: Platform.OS === "android" ? "80%" : "80%%",
        height: height* 0.3,
        width: "85%",
        alignSelf: "center",
        marginVertical: Platform.OS === "android" ? 100 : 250,
        justifyContent: "center",
        

    },
    inputQuantityContainer: {
        
        justifyContent: "center",
        height: "25%",
        width: "100%",
        backgroundColor: "#ecf0f1",
        alignItems: "center"

    },
    inputTableNumContainer:{
        justifyContent: "center",
        height: "25%",
        width: "100%",
        marginBottom: 10,
        
        backgroundColor: "#ecf0f1",
        alignItems: "center",
    },
    buttonInPopup:{
        flexDirection:"row",
        justifyContent: "space-around",
        
    },
    inputQuantity: {
        fontSize: 15,
        padding: 10,
    },
    inputTableNum: {
        fontSize: 15,
        padding: 10,
    },
    textFoodContainer:{
        alignItems: "center",
        padding: 10,
    },
    textFood:{
        color: "#2c3e50",
        fontSize: 15,
        fontStyle: "italic",
        marginBottom: 10,
    },
    
   
   
});


