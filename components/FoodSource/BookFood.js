import { useState } from "react";
import { View, StyleSheet,Modal,Platform,Button, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import FoodCard from "./FoodCard";



const BookFood = () =>{
    const [isModalVisiable, setIsModalVisisable] = useState(false)
    const [quantity,setQuantity]= useState('')
    const [table,setTable]= useState('')



    const pressFood = () =>{
        setIsModalVisisable(true);
    };
    const pressConfirm= () =>{
        setIsModalVisisable(false);
        setQuantity('')
        setTable('')
        console.log(quantity,table);
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
                        name="Nui xào bò trứng"
                        price="35000"
                        onPress={pressFood}
                    />
                    
                </View>
                <Modal 
                    animationType="fade"
                    visible={isModalVisiable}
                    onRequestClose={()=> setIsModalVisisable(!isModalVisiable)}
                    presentationStyle="pageSheet"

                >
                    <View style={styles.inputFoodContainer}>
                        <TextInput
                            style={styles.inputFood}
                            placeholder="Nhập số lượng cho món ăn đã chọn."
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={setQuantity}
                        />
                    </View>
                    <View style={styles.inputFoodContainer}>
                        <TextInput
                            style={styles.inputFood}
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
                        onPress={() => setIsModalVisisable(false)}
                        color="red"
                       />
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
    inputFood: {
        padding: 10,
        fontSize: 15
    },
    inputFoodContainer: {
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: "lightblue"
    },
    button:{
        marginTop: 10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",

    }

})
export default BookFood;
