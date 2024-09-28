import { useEffect, useState } from "react";
import axios from "axios";
import {  StyleSheet, Platform, Text, SafeAreaView,  Alert, FlatList, Button } from "react-native";
import FoodCard from "./FoodCard";
//import FoodData from "./FoodData.json"
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
    const [foodData,setFoodData]= useState(null)
    // Dùng để gọi API khi component mount, API được gọi 1 lần khi component xuất hiện trên màn hình
    useEffect(()=> {
        fetchFoodData();
    }, []);
    const fetchFoodData = async() => {
        try{
            const response = await axios.get('https://quan-ly-bida-backend.onrender.com/food/getAll')
            setFoodData(( response).data.result)
        }catch(error){
            console.error(error);
        }
    }
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
    
    const addFood= async() =>{
        
        if(!quantity|| parseInt(quantity)<=0|| !table || parseInt(table)<=0){
            Alert.alert("Thông báo","Vui lòng nhập số lượng và chọn bàn hợp lệ!")
            return;
        }
        try{
            console.log(selectedFood.id, quantity, table)
            const response= await axios.post('https://quan-ly-bida-backend.onrender.com/food/create',{
                
                foodId: selectedFood.id,
                quantity: quantity,
                tableId: table,

            })
            console.log("==========succcess==========",response.data)
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

        }catch(error){
            Alert.alert("thông báo, có lỗi xảy ra!?")
            console.error(error);
        }
    
        
        // const price=  parseFloat(selectedFood.cost.replace(".",''));
        // const totalPerFood= price*parseInt(quantity);
        // console.log(totalPerFood);
        // //setBill(bill+ totalPerFood)
        
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
        
                data={foodData}
                numColumns={2}
                
                renderItem={({ item }) => (
                    <FoodCard
                        indexImage={imageMap[item.id]}
                        name={item.name}
                        cost={item.cost}
                        onPress={()=> pressFood(item)}
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