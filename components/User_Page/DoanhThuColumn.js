import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ModalDoanhThu } from "./ModalDoanhThu";

export default function DoanhThuColumn() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    handleRevenue();
  }, []); 

  // Fetch data on component mount
  const handleRevenue = async () => {
    try {
      const response = await axios.get("https://quan-ly-bida-backend.onrender.com/status/findAll");
      console.log('API Response:', response.data); // Log the response to check the structure
      setData(response.data.result);
      setFilteredData(response.data.result); // Initially display all data
    } catch (error) {
      console.error(error);
    }
  };

  // Filter data based on selected month and day
  const filterData = () => {
    const filtered = data.filter((item) => {
      // Parse item.date
      const [day, month, year] = item.date.split("/").map(Number);

      // Set conditions for filtering based on selectedMonth and selectedDay
      const monthMatches = selectedMonth === null || month === selectedMonth;
      const dayMatches = selectedDay === null || day === selectedDay;

      return monthMatches && dayMatches;
    });

    setFilteredData(filtered);
  };

  // Trigger filtering when selectedMonth or selectedDay changes
  useEffect(() => {
    filterData();
  }, [selectedMonth, selectedDay, data]);

  // Filter by current month
  const filterByCurrentMonth = () => {
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    setSelectedMonth(currentMonth);
    setSelectedDay(null); // Set day to null to filter by month only
  };

  // Filter by current day
  const filterByCurrentDay = () => {
    const currentDate = new Date();
    setSelectedDay(currentDate.getDate());
    setSelectedMonth(currentDate.getMonth() + 1); // Ensure month matches the current day
  };

  // Render each item in the list
  const RenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        setSelectedBill(item);
        setShowBill(true);
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
      <View style={styles.filterContainer}>
        {/* Clear filters button */}
        <TouchableOpacity onPress={() => { setSelectedMonth(null); setSelectedDay(null); setFilteredData(data); }} style={styles.filterButton}>
          <Text style={styles.filterText}>Clear Filters</Text>
        </TouchableOpacity>
        {/* Filter by Current Month */}
        <TouchableOpacity onPress={filterByCurrentMonth} style={styles.filterButton}>
          <Text style={styles.filterText}>Filter by Current Month</Text>
        </TouchableOpacity>
        {/* Filter by Current Day */}
        <TouchableOpacity onPress={filterByCurrentDay} style={styles.filterButton}>
          <Text style={styles.filterText}>Filter by Current Day</Text>
        </TouchableOpacity>
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
          data={filteredData} // Use filteredData here
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No data available</Text>}
        />
      </ScrollView>

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
