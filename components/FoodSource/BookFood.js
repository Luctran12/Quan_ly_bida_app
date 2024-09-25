import { useState } from "react";
import {  StyleSheet, Platform, Text, SafeAreaView,  Alert, FlatList, Button } from "react-native";
import FoodCard from "./FoodCard";
import FoodData from "./FoodData.json"
import FoodModal from "./FoodModal";
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
    const [isModalVisiable, setIsModalVisisable] = useState(false)
    const [quantity,setQuantity]= useState('')
    const [table,setTable]= useState('')


    const pressFood = (food) =>{
        setIsModalVisisable(true);
        setSelectFood(food);
    };

    const addFood= () =>{
        // if (!selectedFood) {
        //     Alert.alert("Thông báo", "Vui lòng chọn món ăn!");
        //     return;
        // }
        if(!quantity|| parseInt(quantity)<=0|| !table || parseInt(table)<=0){
            Alert.alert("Thông báo","Vui lòng nhập số lượng và chọn bàn hợp lệ!")
        }else{
            Alert.alert(
                "Thông báo",
                "Thêm món thành công!"
               
            );
        }
        const price=  parseFloat(selectedFood.cost.replace(".",''));
        const totalPerFood= price*parseInt(quantity);
        console.log(totalPerFood);
        setBill(bill+ totalPerFood)

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
        {/* <Text style={styles.title}>🍴Food and drink😋</Text> */}
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
           <FoodModal
            isVisible={isModalVisiable}
            quantity={quantity}
            setQuantity={setQuantity}
            table={table}
            setTable={setTable}
            onConfirm={addFood}
            onCancel={pressCancel}
            nameFood={selectedFood ? selectedFood.name : ''}
           />
        {/* <View style={styles.buttonContainer}>
            <Button
            style= {styles.totalButton}
            title= "Thanh toan"
            onPress={PressPay}
            />   
            <Button
                title="Lam moi"
                style={styles.resetButton}
                onPress={resetBill}
            />
        </View>         */}
        
        
    </SafeAreaView>



    )
}
const styles=StyleSheet.create({
    list: {
        padding
        : 8,
    },
    // title: {
    //     fontSize: 25,
    //     fontWeight: "bold",
    //     marginBottom: 15,
    // },
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

    // bottom: {
    //     padding: 10,        
    //     flexDirection:"row",
    //     justifyContent: "space-around",
    // },

})
export default BookFood;