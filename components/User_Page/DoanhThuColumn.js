import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalDoanhThu } from "./ModalDoanhThu";
import { Picker } from '@react-native-picker/picker';

export default function DoanhThuColumn() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    handleRevenue();
  }, []);

  const handleRevenue = async () => {
    try {
      const response = await axios.get("https://quan-ly-bida-backend.onrender.com/status/findAll");
      setData(response.data.result);
      setFilteredData(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const filterData = () => {
    const filtered = data.filter((item) => {
      const [day, month, year] = item.date.split("/").map(Number);
      const monthMatches = selectedMonth === null || month === selectedMonth;
      const dayMatches = selectedDay === null || day === selectedDay;
      return monthMatches && dayMatches;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [selectedMonth, selectedDay, data]);

  useEffect(() => {
    const revenue = filteredData.reduce((sum, item) => sum + item.totalCost, 0);
    setTotalRevenue(revenue);
  }, [filteredData]);

  const RenderItem = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={() => { setSelectedBill(item); setShowBill(true); }} >
      <Text style={styles.text}>{item.billiardTable.id}</Text>
      <Text style={styles.text}>{item.date}</Text>
      <Text style={styles.text}>{item.order.id}</Text>
      <Text style={styles.text}>{item.startTime}</Text>
      <Text style={styles.text}>{item.endTime}</Text>
      <Text style={styles.textTotal}>{item.totalCost.toLocaleString()} đ</Text>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => {
          setSelectedMonth(null);
          setSelectedDay(null);
          setFilteredData(data);
        }} style={styles.filterButton}>
          <Text style={styles.filterText}>Clear Filters</Text>
        </TouchableOpacity>

        {!showMonthPicker && (
          <TouchableOpacity onPress={() => setShowMonthPicker(true)} style={styles.filterButton}>
            <Text style={styles.filterText}>Filter by Month</Text>
          </TouchableOpacity>
        )}
        {showMonthPicker && (
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => {
              setSelectedMonth(itemValue);
              setShowMonthPicker(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Month" value={null} />
            {[...Array(12).keys()].map(month => (
              <Picker.Item key={month + 1} label={`Month ${month + 1}`} value={month + 1} />
            ))}
          </Picker>
        )}

        {!showDayPicker && (
          <TouchableOpacity onPress={() => setShowDayPicker(true)} style={styles.filterButton}>
            <Text style={styles.filterText}>Filter by Day</Text>
          </TouchableOpacity>
        )}
        {showDayPicker && (
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => {
              setSelectedDay(itemValue);
              setShowDayPicker(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Day" value={null} />
            {[...Array(31).keys()].map(day => (
              <Picker.Item key={day + 1} label={`Day ${day + 1}`} value={day + 1} />
            ))}
          </Picker>
        )}
      </View>

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
          data={filteredData}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No data available</Text>}
        />
      </ScrollView>

      <View style={styles.row}>
        <Text style={styles.text}>Tổng doanh thu:</Text>
        <Text style={styles.textTotal}>{totalRevenue.toLocaleString()} đ</Text>
      </View>

      {showBill && selectedBill && (
        <ModalDoanhThu
          table={selectedBill.table}
          startTime={selectedBill.startTime}
          endTime={selectedBill.endTime}
          totalTime={selectedBill.totalTime}
          totalCost={selectedBill.totalCost}
          order={selectedBill.order.orderFoodItems}
          show={showBill}
          setShow={setShowBill}
        />
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  filterText: {
    color: "#333",
    fontWeight: "bold",
  },
  picker: {
    width: 150,
    alignSelf: "center",
  },
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
