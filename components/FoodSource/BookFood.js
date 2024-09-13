import { useState } from "react";
import { View, StyleSheet,Modal,Platform,Button, Text, SafeAreaView, ScrollView, TextInput, Alert } from "react-native";
import FoodCard from "./FoodCard";



const BookFood = () =>{
    const [isModalVisiable, setIsModalVisisable] = useState(false)
    const [quantity,setQuantity]= useState('')
    const [table,setTable]= useState('')
    const [selectFood, setSelectFood] = useState('')


    const pressFood = (name) =>{
        setSelectFood(name)
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
        <Text style={styles.title}>Đặt đồ ăn</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            
                
                <View style={styles.foodLayout}>
                    <FoodCard 
                        indexImage={require('./Food/kem.png')}
                        name="Kem"
                        price="10000"
                        onPress={pressFood}
                    />
                    <FoodCard
                        indexImage={require('./Food/sting.png')}
                        name="Sting"
                        price="12000"
                        onPress={pressFood}
                    />
                    <FoodCard
                        indexImage={require('./Food/pepsi.png')}
                        name="Pepsi"
                        price="12000"
                        onPress={pressFood}
                    />
                    <FoodCard
                        indexImage={require('./Food/mitom.png')}
                        name="Mì 3 con tôm"
                        price="25.000"
                        onPress={pressFood}
                    />
                    <FoodCard
                        indexImage={require('./Food/chanhday.png')}
                        name="Chanh dây"
                        price="12000"
                        onPress={pressFood}
                    />
                    <FoodCard
                        indexImage={require('./Food/nui.png')}
                        name="Nui xào bò"
                        price="35000"
                        onPress={pressFood}
                    />
                    
                </View>
                    <Modal 
                        animationType="fade"
                        visible={isModalVisiable}
                        onRequestClose={()=> setIsModalVisisable(!isModalVisiable)}
                        transparent= {true}
                    >
                    {/* <View>
                        <Text>Bạn đã chọn </Text>
                    </View> */}
                    
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
            
        </ScrollView>
        
    </SafeAreaView>

    


    )
}
const styles=StyleSheet.create({
    scrollViewContainer: {
        alignItems: "center",
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
        alignItems:"center"

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
