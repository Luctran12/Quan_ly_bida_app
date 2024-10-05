import { useState , useEffect} from "react";
import { FlatList, View } from "react-native";
import Table from "./Table";
import request from "../utils/request";
export default function TablesScreen() {
  let myMap = new Map();
  const [tableId, setTableId] = useState(0); // ID bàn nguồn
  const [timePlayFromTableId, setTimePlayFromTableId] = useState(); // Thời gian bắt đầu của bàn nguồn
  const [goalTableId, setGoalTableId] = useState(0); // ID bàn đích
  const [tableData, setTableData] = useState(null)
  const handleChangeTable = (goalId) => {
    console.log(`Chuyển từ bàn ${tableId} sang bàn ${goalId}`);
    setGoalTableId(goalId); // Lưu ID bàn đích để tự động mở
  };

  const handleSelectItem = (itemId, startTimeFromTable) => {
    setTableId(itemId); // Lưu ID bàn nguồn
    setTimePlayFromTableId(startTimeFromTable); // Lưu thời gian bắt đầu của bàn nguồn
    console.log("Bàn nguồn đã chọn:", itemId, "Thời gian:", startTimeFromTable);
  };
  useEffect(()=> {
    fetchTableData();
}, []);
const fetchTableData = async() => {
    try{
        const response = await request.get('/billiard_table/getAllTable')
        setTableData(( response).data.result)
       // console.log((response).data.result)
    }catch(error){
        console.error(error);
    }
}
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
      <FlatList
        numColumns={2}
        data={tableData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Table
            orderMap = {myMap}
            id={item.id}
            type={item.type}
            cost={item.costPerHour}
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
