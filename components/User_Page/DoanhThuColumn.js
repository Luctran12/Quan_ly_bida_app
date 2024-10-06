import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DoanhThuColumn() {
  const [data, setData] = useState([]);

  const handleRevenue = async () => {
    console.log("Đang gọi API để tạo người dùng...");
    try {
      const response = await axios.get("https://quan-ly-bida-backend.onrender.com/status/findAll");
      setData(response.data.result); // Cập nhật state với dữ liệu từ API
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRevenue();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.text}>{item.billiardTable.id}</Text>
      <Text style={styles.text}>{item.date}</Text>
      <Text style={styles.text}>{item.order.id}</Text>
      <Text style={styles.text}>{item.startTime}</Text>
      <Text style={styles.text}>{item.endTime}</Text>
      <Text style={styles.text}>{item.totalCost}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View>
      <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
        <Text style={styles.header}>Table</Text>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.header}>OrderId</Text>
        <Text style={styles.header}>Start Time</Text>
        <Text style={styles.header}>End Time</Text>
        <Text style={styles.header}>Total</Text>
      </ScrollView>
      <FlatList
        pagingEnabled={true}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Đảm bảo key là chuỗi
      />

    </View>
    

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  text: { marginTop: 20, marginLeft: 10, width: 80 },
  header: { marginTop: 20, marginLeft: 10, fontWeight: "bold", width: 80 }
});
