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

    console.log("chuyen ban");
    console.log("visible:", changeTableVisible);

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
              borderWidth: 1,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  height: 30,
                  width: 100,
                  backgroundColor: "#1daec9",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
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
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#e6e6e6",
              height: 180,
              width: 300,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 180,
                width: 250,
              }}
            >
              <View
                style={{
                  // backgroundColor: "black",
                  // height: "20%",
                  // width: 250,

                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  borderWidth: 1,
                }}
              >
                <Text style={{ fontSize: 20 }}>Chuyển sang bàn số: </Text>
                <View
                  style={{
                    width: 100,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    onChangeText={(idTable) => setIdChangeTable(idTable)}
                    keyboardType="numeric"
                    placeholder="số bàn"
                  />
                </View>

                <TouchableOpacity
                  onPress={handleChangeTables}
                  style={{
                    height: 30,
                    width: 70,
                    marginTop: 10,
                    backgroundColor: "#1bafc8",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Chuyển
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
