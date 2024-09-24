import { useState } from "react";
import { View, StyleSheet,Modal,Platform,Button, Text, SafeAreaView, TextInput, Alert, FlatList, Pressable } from "react-native";
import FoodCard from "./FoodCard";
import FoodData from "./FoodData.json"
import OpenFoodModal from "./OpenFoodModal";
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
    
    const [selectedFood, setSelectFood]= useState(null)
    const [bill,setBill]= useState(0)
    const [quantity,setQuantity]= useState(null)
    const [table,setTable]= useState(null)
    const [isModalVisiable, setIsModalVisisable] = useState(false)




    const pressFood = (food) =>{
        setSelectFood(food)
        //setIsModalVisisable(true);
        
    };
    
    const PressPay= ()=>{
        if(bill<=0){
            Alert.alert("Thông báo", "Vui lòng thêm món ăn")
        }else{
            console.log(bill);
        }
        
    }
    // const resetBill=()=>{
    //     setSelectFood(null)
    //     setQuantity(null)
    //     setTable(null)
    //     /setIsModalVisisable(false)
    //     setBill(0);
    //     Alert.alert("Thông báo", "Làm mới thành công")
    // }
    


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
           
                    

        
        <OpenFoodModal
            visible={isModalVisiable}
            quantity
        />

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
    

})
export default BookFood;