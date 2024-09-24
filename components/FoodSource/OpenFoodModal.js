import { Modal,StyleSheet,Platform ,Button,Alert,Text,TextInput, onPress, View } from "react-native";
import { useState } from "react";
export default function OpenTableModal({
    visible,
    food,
    
}) {
    const [quantity,setQuantity]= useState(null)
    const [table,setTable]= useState(null)



    const addFood= () =>{
        if(!quantity|| parseInt(quantity)<=0|| !table || parseInt(table)<=0){
            Alert.alert("Thông báo","Vui lòng nhập số lượng và chọn bàn hợp lệ!")
        }else{
            Alert.alert(
                "Thông báo",
                "Thêm món thành công!"
               
            );
        }
        const price=  parseFloat(selectedFood.cost);
        const totalPerFood= price*parseInt(quantity);
        setBill(bill+ totalPerFood)
        setQuantity(null)
        setTable(null)
        setIsModalVisisable(false);
    }
    const pressCancel= () =>{
        setQuantity(null)
        setTable(null)
        setIsModalVisisable(false)
    }
    return(
                    <View>
                        <Modal 
                            animationType="fade"
                            visible={visible}
                            //onRequestClose={()=> setIsModalVisisable(!isModalVisiable)}
                            transparent= {true}
                        >
                        
    
                            <View style={styles.popup}>
                                <View style={styles.inputQuantityContainer}>
                                    <TextInput
                                        style={styles.inputQuantity}
                                        placeholder="Nhập số lượng cho món ăn."
                                        keyboardType="numeric"
                                        value={quantity}
                                        onChangeText={setQuantity}
                                    />
                                </View>
                                <View style={styles.inputTableNumContainer}>
                                    <TextInput
                                        style={styles.inputTableNum}
                                        placeholder="Nhập số bàn của khách."
                                        keyboardType="numeric"
                                        value={table}
                                        onChangeText={setTable}
                                    />
                                </View>
                        
                                <View style={styles.buttonInPopup}>
                                    <Button
                                        title="Thêm món"
                                        onPress={addFood}
                                    /> 
                                    <Button
                                        title= "Huỷ"
                                        onPress={pressCancel}
                                        color="red"
                                    />
                                    
                                </View >
                                <View style={styles.button}>
                                    
                                </View>
                            </View>
                        </Modal>
                    </View>
)

}
const styles=StyleSheet.create({
    inputQuantity: {
        fontSize: 15,
        padding: 10,
    },
    inputTableNum: {
        fontSize: 15,
        padding: 10,
    },
    inputQuantityContainer: {
        
        justifyContent: "center",
        height: "25%",
        backgroundColor: "#555555",
        alignItems: "center"

    },
    inputTableNumContainer:{
        justifyContent: "center",
        height: "25%",
        marginBottom: 10,
        backgroundColor: "#555555",
        alignItems: "center",
    },
    buttonInPopup:{
        marginTop: 19,
        flexDirection:"row",
        justifyContent: "space-evenly",

    },
    
    popup:{
        backgroundColor:"#FFFFFF",
        borderRadius: 5,
        borderWidth: 1,
        height: Platform.OS === "android" ? "30%" : "25%",
        width: Platform.OS === "android" ? "80%" : "80%%",
        alignSelf: "center",
        marginVertical: Platform.OS === "android" ? 100 : 250,
        justifyContent: "center",

    },
    bottom: {
        padding: 10,        
        flexDirection:"row",
        justifyContent: "space-around",
    },
    totalButton:{
        
        fontSize: 18,
        marginRight: 20,
        color: "grey",
        height: 20,
    },
    resetButton:{
        
        fontSize: 18,
        marginLeft: 20,
        color: "grey"
    },
})
