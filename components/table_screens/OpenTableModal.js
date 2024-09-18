import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function OpenTableModal({
  onClose,
  visible,
  tableName,
  onAcceptPress,
}) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
            <Text style={{ fontSize: 25 }}>Xác nhận đặt bàn {tableName}</Text>

            <View style={{ height: 50, width: 100, alignSelf: "center" }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  onPress={onAcceptPress}
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
                  <Text>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onClose}
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
                  <Text>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
