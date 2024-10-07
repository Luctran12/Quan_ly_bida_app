import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export default function DoanhThuColumn() {
  const [data, setData] = useState([]);

  const handleRevenue = async () => {
    console.log("Đang gọi API để tạo người dùng...");
    try {
      const response = await axios.get(
        "https://quan-ly-bida-backend.onrender.com/status/findAll"
      );
      setData(response.data.result); // Cập nhật state với dữ liệu từ API
      console.log("======>", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRevenue();
  }, []);

  useEffect(() => {
    console.log("======>", data);
  }, [data]);

  const RenderItem = ({ id, date, orderId, startTime, endTime, totalCost }) => (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.text}>{id}</Text>
      <Text style={styles.text}>{date}</Text>
      <Text style={styles.text}>{orderId}</Text>
      <Text style={styles.text}>{startTime}</Text>
      <Text style={styles.text}>{endTime}</Text>
      <Text style={styles.text}>{totalCost}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <ScrollView horizontal>
          <Text style={styles.header}>Table</Text>
          <Text style={styles.header}>Date</Text>
          <Text style={styles.header}>OrderId</Text>
          <Text style={styles.header}>Start Time</Text>
          <Text style={styles.header}>End Time</Text>
          <Text style={styles.header}>Total</Text>
        </ScrollView>
      </View>

      <ScrollView horizontal>
        <FlatList
          pagingEnabled={true}
          //horizontal={true}
          data={data}
          renderItem={({ item }) => (
            <RenderItem
              id={item.billiardTable.id}
              date={item.date}
              orderId={item.order.id}
              startTime={item.startTime}
              endTime={item.endTime}
              totalCost={item.totalCost}
            />
          )}
          keyExtractor={(item) => item.id.toString()} // Đảm bảo key là chuỗi
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    marginLeft: 10,
    width: 80,
  },
  header: { marginTop: 20, marginLeft: 10, fontWeight: "bold", width: 80 },
});
