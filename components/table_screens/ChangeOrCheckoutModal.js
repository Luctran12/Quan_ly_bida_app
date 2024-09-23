import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChangeOrCheckoutModal({
  visible,
  handlCheckout,
  elapsedTime,
  handleResetAllStatus,
  onClose,
  id,
  handleSelect,
  startTime,
  handleChangeTable,
  handleResetAllStatuss,
}) {
  const [changeTableVisible, setChangeTableVisible] = useState(false);
  const [idChangeTable, setIdChangeTable] = useState(0);
  const handleChangeTables = () => {
    onClose();
    setChangeTableVisible(false);
    handleSelect(idChangeTable, startTime);
    handleChangeTable(idChangeTable);
    handleResetAllStatuss();
    console.log("idchangetable:", idChangeTable);
    console.log("id", id);
    console.log("start time", startTime);
  };

  const handleChangeTableButton = () => {
    setChangeTableVisible(true);
    onClose();
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "25%",
              width: "85%",
              backgroundColor: "#e6e6e6",
              alignItems: "center",
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  height: 30,
                  width: 100,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Back</Text>
              </TouchableOpacity>
            </View>

            <Text>Bạn muốn chuyển bàn hay thanh toán ?</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={handleChangeTableButton}
                style={{
                  height: 30,
                  width: 80,
                  backgroundColor: "#8c8c8c",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                  marginTop: 10,
                }}
              >
                <Text>Chuyển bàn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlCheckout}
                style={{
                  height: 30,
                  width: 80,
                  backgroundColor: "#8c8c8c",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text>Thanh toán</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={changeTableVisible} transparent={true}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "gray",
              height: 180,
              width: 250,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Chuyển sang bàn số: </Text>
            <TextInput
              onChangeText={(idTable) => setIdChangeTable(idTable)}
              keyboardType="numeric"
              placeholder="số bàn"
            />
            <TouchableOpacity
              onPress={handleChangeTables}
              style={{ height: 30, width: 70, backgroundColor: "#e0e0eb" }}
            >
              <Text>Chuyển</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
