import { useState } from "react";
import {  StyleSheet, Platform, Text, SafeAreaView,  Alert, FlatList, Button } from "react-native";
import FoodCard from "./FoodCard";
import FoodData from "./FoodData.json"
import FoodModal from "./FoodModal";
import BillModal from "./BillModal";
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
    //const [bill,setBill]= useState(0)
    const [isModalVisiable, setIsModalVisisable] = useState(false)
    const [quantity,setQuantity]= useState('')
    const [table,setTable]= useState('')
    
    const [orderedItems, setOrderedItems] = useState([]); // Danh sách món đã đặt
    const [isBillModalVisible, setIsBillModalVisible] = useState(false);
    const openBillModal = () => {
        setIsBillModalVisible(true);
    };
    const closeBillModal = () => {
        setIsBillModalVisible(false);
    };
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
            return;
        }else{
            Alert.alert(
                "Thông báo",
                "Thêm món thành công!"
               
            );
        }
        const price=  parseFloat(selectedFood.cost.replace(".",''));
        const totalPerFood= price*parseInt(quantity);
        console.log(totalPerFood);
        //setBill(bill+ totalPerFood)
        setOrderedItems(prevItems => [...prevItems, { 
            name: selectedFood.name, 
            cost: selectedFood.cost, 
            quantity: quantity,
            table: table,
            total: totalPerFood 
        }]);
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
    const resetBill= () =>{
        setOrderedItems([])
        setIsBillModalVisible(false);
        Alert.alert("Hoá đơn đã làm mới");
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
        
          
                
        
        <Button title="Xem lại hóa đơn" onPress={openBillModal} />
        <BillModal 
            isVisible={isBillModalVisible}
            onClose={closeBillModal}
            orderedItems={orderedItems}
            onResetBill={resetBill}
            //bill={bill}
        />
    </SafeAreaView>



    )
}
const styles=StyleSheet.create({
    list: {
        paddingHorizontal: 8,
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