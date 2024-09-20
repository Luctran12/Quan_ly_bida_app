import { useState } from "react";
import { View, StyleSheet,Modal,Platform,Button, Text, SafeAreaView, TextInput, Alert, FlatList, Pressable } from "react-native";
import FoodCard from "./FoodCard";
import FoodData from "./FoodData.json"
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

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
    const [quantity,setQuantity]= useState(null)
    const [selectedFood, setSelectFood]= useState(null)
    const [table,setTable]= useState(null)
    const [bill,setBill]= useState(0)



    const pressFood = (food) =>{
        setSelectFood(food)
        setIsModalVisisable(true);
        
    };
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
    const PressPay= ()=>{
        if(bill<=0){
            Alert.alert("Thông báo", "Vui lòng thêm món ăn")
        }else{
            console.log(bill);
        }
        
    }
    const resetBill=()=>{
        setSelectFood(null)
        setQuantity(null)
        setTable(null)
        setIsModalVisisable(false)
        setBill(0);
        Alert.alert("Thông báo", "Làm mới thành công")
    }
    const pressCancel= () =>{
        setQuantity(null)
        setTable(null)
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
                        onPress={() => pressFood(item)}
                    />
                )}
                
            /> 
           
                    <Modal 
                        animationType="fade"
                        visible={isModalVisiable}
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

        <View style={styles.bottom}>
            <Pressable onLongPress={PressPay}><Text style={styles.totalButton}>Tính tiền</Text></Pressable>                
            <Pressable onLongPress={resetBill}><Text style={styles.resetButton}>Làm mới</Text></Pressable>                

        </View>
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
    text: {
        fontSize:15,
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
        color: "grey"
    },
    resetButton:{
        
        fontSize: 18,
        marginLeft: 20,
        color: "grey"
    },

})
export default BookFood;
