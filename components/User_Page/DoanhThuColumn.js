import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRevenue();
  }, []);

  const RenderItem = ({ id, date, orderId, startTime, endTime, totalCost }) => (
    <View style={styles.row}>
      <Text style={styles.text}>{id}</Text>
      <Text style={styles.text}>{date}</Text>
      <Text style={styles.text}>{orderId}</Text>
      <Text style={styles.text}>{startTime}</Text>
      <Text style={styles.text}>{endTime}</Text>
      <Text style={styles.textTotal}>{totalCost}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, alignItems: "center" }}>
      <SafeAreaView style={styles.headerRow}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.header}>Table</Text>
          <Text style={styles.header}>Date</Text>
          <Text style={styles.header}>OrderId</Text>
          <Text style={styles.header}>Start Time</Text>
          <Text style={styles.header}>End Time</Text>
          <Text style={styles.header}>Total</Text>
        </View>
      </SafeAreaView>

      <ScrollView horizontal>
        <FlatList
          pagingEnabled={true}
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
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#1da1f2",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#d6e0eb",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    marginLeft: 10,
    width: 120,
    fontSize: 15,
    color: "#333",
    textAlign: "center",
  },
  textTotal: {
    marginLeft: 10,
    width: 120,
    fontSize: 16,
    color: "#e74c3c",
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    marginLeft: 10,
    width: 120,
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
