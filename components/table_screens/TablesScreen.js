import { useState } from "react";
import { FlatList, View } from "react-native";
import Table from "./Table";
import TableData from "./TableData.json";

export default function TablesScreen() {
  const [timePlayed, setTimePlayed] = useState();
  const [tableId, setTableId] = useState(null);

  const handleChangeTable = (tableSourceId, tableGoalId, timePlayed) => {};

  const handleSelectItem = (itemId) => {
    setTableId(itemId);
    console.log("=>>>>>>>", tableId);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FlatList
        numColumns={2}
        data={TableData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Table
            id={item.id}
            type={item.type}
            cost={item.cost}
            idSelected={tableId}
            handleSelectItem={handleSelectItem}
          />
        )}
      />
    </View>
  );
}
