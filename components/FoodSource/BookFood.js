import { useState } from "react";
import { StyleSheet, Platform, SafeAreaView, Alert, FlatList } from "react-native";
import FoodCard from "./FoodCard";
import FoodData from "./FoodData.json";
import FoodModal from "./FoodModal";
//import useSolveData from "./SolveData";

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
};

const BookFood = () => {
  //const { saveFoodData } = useSolveData(); 
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [table, setTable] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const pressFood = (food) => {
    setIsModalVisible(true);
    setSelectedFood(food);
  };

  const addFood= () =>{
    if (!selectedFood) {
        Alert.alert("Thông báo", "Vui lòng chọn món ăn!");
        return;
    }
    if(!quantity|| parseInt(quantity)<=0|| !table || parseInt(table)<=0){
        Alert.alert("Thông báo","Vui lòng nhập số lượng và chọn bàn hợp lệ!")
    }else{
        Alert.alert(
            "Thông báo",
            "Thêm món thành công!"
           
        );
    }
    const price=  parseInt(selectedFood.cost);
    const totalPerFood= price*parseInt(quantity);
    console.log(totalPerFood);
    //setBill(bill+ totalPerFood)
    setQuantity('')
    setTable('')
    setIsModalVisible(false);
}

  const pressCancel = () => {
    setQuantity('');
    setTable('');
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
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
        isVisible={isModalVisible}
        quantity={quantity}
        setQuantity={setQuantity}
        table={table}
        setTable={setTable}
        onConfirm={addFood}
        onCancel={pressCancel}
        nameFood={selectedFood ? selectedFood.name : ''}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
  safe: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 15 : 0,
  },
});

export default BookFood;
