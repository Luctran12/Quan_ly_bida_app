import { useState } from "react";
import { FlatList, View } from "react-native";
import Table from "./Table";
import TableData from "./TableData.json";

export default function TablesScreen() {
  const [tableId, setTableId] = useState(0); // ID bàn nguồn
  const [timePlayFromTableId, setTimePlayFromTableId] = useState(); // Thời gian bắt đầu của bàn nguồn
  const [goalTableId, setGoalTableId] = useState(0); // ID bàn đích

  const handleChangeTable = (goalId) => {
    console.log(`Chuyển từ bàn ${tableId} sang bàn ${goalId}`);
    setGoalTableId(goalId); // Lưu ID bàn đích để tự động mở
  };

  const handleSelectItem = (itemId, startTimeFromTable) => {
    setTableId(itemId); // Lưu ID bàn nguồn
    setTimePlayFromTableId(startTimeFromTable); // Lưu thời gian bắt đầu của bàn nguồn
    console.log("Bàn nguồn đã chọn:", itemId, "Thời gian:", startTimeFromTable);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
      <FlatList
        numColumns={2}
        data={TableData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Table
            id={item.id}
            type={item.type}
            cost={item.cost}
            idSelected={tableId} // Truyền bàn nguồn
            handleSelectItem={handleSelectItem} // Truyền hàm chọn bàn
            timePlayFromSourceTable={timePlayFromTableId} // Truyền thời gian của bàn nguồn
            autoOpen={String(goalTableId) === String(item.id)} // Tự động mở bàn đích
            handleChangeTable={handleChangeTable} // Truyền hàm chuyển bàn
          />
        )}
      />
    </View>
  );
}
