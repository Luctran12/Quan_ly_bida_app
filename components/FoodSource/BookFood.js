import { useState } from "react";
import { View, StyleSheet,Modal,Platform,Button, Text, SafeAreaView, TextInput, Alert, FlatList } from "react-native";
import FoodCard from "./FoodCard";
import FoodData from "./FoodData.json"

const imageMap = {
    'Kem': require('../../assets/Food/kem.png'),
    'Sting': require('../../assets/Food/sting.png'),
    'Pepsi': require('../../assets/Food/pepsi.png'),
    'Mì tôm': require('../../assets/Food/mitom.png'),
    'Trà đá': require('../../assets/Food/trada.png'),
    'Nui xào': require('../../assets/Food/nui.png'),
    'Cà phê': require('../../assets/Food/cf.png'),
    'Bạc xỉu': require('../../assets/Food/cfs.png'),
    'Trà sữa': require('../../assets/Food/ts.png'),
    'Trà đào': require('../../assets/Food/td.png'),
    
}
const BookFood = () =>{
    const [isModalVisiable, setIsModalVisisable] = useState(false)
    const [quantity,setQuantity]= useState('')
    const [table,setTable]= useState('')


    const pressFood = () =>{
        setIsModalVisisable(true);
    };
    const pressConfirm= () =>{
        Alert.alert(
            "Thông báo",
            "Đặt món thành công!"
           
        );
        setQuantity('')
        setTable('')
        console.log(quantity,table);
        setIsModalVisisable(false);
    }
    const pressCancel= () =>{
        setQuantity('')
        setTable('')
        setIsModalVisisable(false)
    }


    return(
    <SafeAreaView style={styles.safe}>
        <Text style={styles.title}>🍴Food and drink😋</Text>
            <FlatList 
                contentContainerStyle={styles.list}
        
                data={FoodData}
                numColumns={2}
                
                renderItem={({ item }) => (
                    <FoodCard
                        indexImage={imageMap[item.name]}
                        name={item.name}
                        cost={item.cost}
                        onPress={pressFood}
                    />
                )}
            /> 
                    <Modal 
                        animationType="fade"
                        visible={isModalVisiable}
                        onRequestClose={()=> setIsModalVisisable(!isModalVisiable)}
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
                    
                            <View style={styles.button}>
                                <Button
                                    title="Xác nhận"
                                    onPress={pressConfirm}
                                /> 
                                <Button
                                    title= "Huỷ"
                                    onPress={pressCancel}
                                    color="red"
                                />
                            </View>
                        </View>
                    </Modal>
            
        
        
    </SafeAreaView>

    


    )
}
const styles=StyleSheet.create({
    list: {
        padding
        : 8,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        marginVertical: 20
    },
    foodLayout: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: "80%",
        
    },
    safe: {
        flex: 1,
        alignItems:"center",
        marginTop: Platform.OS ==="android" ? 15 : 0,

    },
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
        backgroundColor: "lightblue",
        alignItems: "center"

    },
    inputTableNumContainer:{
        justifyContent: "center",
        height: "25%",
        marginBottom: 10,
        backgroundColor: "lightblue",
        alignItems: "center",
    },
    button:{
        marginTop: 5,
        flexDirection:"row",
        justifyContent: "space-evenly",

    },
    popup:{
        backgroundColor:"#FFFFFF",
        borderRadius: 5,
        borderWidth: 1,
        height: Platform.OS === "android" ? "30%" : "20%",
        width: Platform.OS === "android" ? "80%" : "80%%",
        alignSelf: "center",
        marginVertical: Platform.OS === "android" ? 100 : 250,
        justifyContent: "center",

    }

})
export default BookFood;
