import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalDoanhThu } from "./ModalDoanhThu";

export default function DoanhThuColumn() {
  const [data, setData] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleRevenue = async () => {
    try {
      const response = await axios.get("https://quan-ly-bida-backend.onrender.com/status/findAll");
      setData(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRevenue();
  }, []);

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        setSelectedBill(item); // Lưu thông tin hóa đơn đã chọn
        setShowBill(true); // Hiển thị modal
      }}
    >
      <Text style={styles.text}>{item.billiardTable.id}</Text>
      <Text style={styles.text}>{item.date}</Text>
      <Text style={styles.text}>{item.order.id}</Text>
      <Text style={styles.text}>{item.startTime}</Text>
      <Text style={styles.text}>{item.endTime}</Text>
      <Text style={styles.textTotal}>{item.totalCost}</Text>
    </TouchableOpacity>
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
          data={data}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>

      {/* Hiển thị Modal khi bấm vào tổng chi phí */}
      {showBill && selectedBill && (
        <ModalDoanhThu
          {...selectedBill}
          show={showBill}
          setShow={setShowBill}
        />
      )}
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
