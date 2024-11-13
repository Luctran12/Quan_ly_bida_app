import { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useOrder } from "../context/OrderContext";
import request from "../utils/request";
import FoodCard from "./FoodCard";
import FoodModal from "./FoodModal";
//import PostOrderId from "../utils/PostOrderId";

const imageMap = {
  "Kem": require("../../assets/Food/kem.png"),
  "Sting": require("../../assets/Food/sting.png"),
  "Pepsi": require("../../assets/Food/pepsi.png"),
  "Mì tôm": require("../../assets/Food/mitom.png"),
  "Trà Đá": require("../../assets/Food/trada.png"),
  "Nui xào": require("../../assets/Food/nui.png"),
  "Cà Phê": require("../../assets/Food/cf.png"),
  "Cà phê sữa": require("../../assets/Food/cfs.png"),
  "Trà sữa": require("../../assets/Food/ts.png"),
  "Trà Đào": require("../../assets/Food/td.png"),
};
const BookFood = () => {
  const { orderId, tableId } = useOrder();
  const [selectedFood, setSelectFood] = useState(null);
  const [isModalVisiable, setIsModalVisisable] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [table, setTable] = useState("");
  const [foodData, setFoodData] = useState(null);
  // Dùng để gọi API khi component mount, API được gọi 1 lần khi component xuất hiện trên màn hình
  useEffect(() => {
    fetchFoodData();
  }, []);
  const fetchFoodData = async () => {
    try {
      const response = await request.get("/food/getAll");
      setFoodData(response.data.result);
      // console.log((response).data.result)
    } catch (error) {
      console.error(error);
    }
  };

  const pressFood = (food) => {
    setIsModalVisisable(true);
    setSelectFood(food);
  };

  const addFood = async () => {
    setQuantity("");
    setTable("");
    if (
      !quantity ||
      parseInt(quantity) <= 0 ||
      !table ||
      parseInt(table) <= 0
    ) {
      Alert.alert("Thông báo", "Vui lòng nhập số lượng và chọn bàn hợp lệ!");
      return;
    } else if (table != tableId) {
      Alert.alert("Thông báo", "Vui lòng nhập đúng số bàn");
      return;
    }
    setIsModalVisisable(false);
    Alert.alert("Thông báo", "Thêm món thành công");
    try {
      console.log(
        "FoodId: ",
        selectedFood.id,
        "Quantity: ",
        quantity,
        "TableId: ",
        table,
        "OrderId: ",
        orderId
      );
      if (orderId == null) {
        Alert.alert("Thông báo", "Vui lòng đặt bàn trước");
        return;
      } else {
        const response = await request.post("OrderFoodItem/create", {
          foodId: selectedFood.id,
          quantity: quantity,
          tableId: table,

          orderId: orderId,
        });
        console.log("==========success==========", response.data);

        
      }
    } catch (error) {
      Alert.alert("thông báo, có lỗi xảy ra!?");
      console.error(error);
    }
  };
  const pressCancel = () => {
    setQuantity("");
    setTable("");
    setIsModalVisisable(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* <Text style={styles.title}>🍴Food and drink😋</Text> */}
      <FlatList
        contentContainerStyle={styles.list}
        data={foodData}
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
        nameFood={selectedFood ? selectedFood.name : ""}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  list: {
    margin: 10,
  },

  foodLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "80%",
  },
  safe: {
    flex: 1,
    alignItems: "center",
    //marginTop: Platform.OS ==="android" ? 15 : 0,
    backgroundColor: "#c4c0c4",
  },
});
export default BookFood;