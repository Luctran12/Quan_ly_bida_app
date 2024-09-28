import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChangeOrCheckoutModal from "./ChangeOrCheckoutModal";
import OpenTableModal from "./OpenTableModal";
export default function Table({
  id,
  type,
  cost,
  idSelected,
  timePlayFromSourceTable,
  handleChangeTable,
  handleSelectItem,
  change,
  autoOpen,
}) {
  const [available, setAvailable] = useState(false);
  const [startTime, setStartTime] = useState(null); // Lưu thời gian bắt đầu
  const [elapsedTime, setElapsedTime] = useState(0); // Thời gian đã trôi qua
  const [isRunning, setIsRunning] = useState(false); // Kiểm tra bộ đếm có đang chạy hay không
  const [countTimeButtonState, setCountTimeButtonState] = useState(false);
  const [total, setTotal] = useState(0);
  const [openTableModalVisible, setOpenTableModalVisible] = useState(false);
  const [changeOrCheckoutModalVisible, setChangeOrCheckoutVisible] =
    useState(false);

  useEffect(() => {
    if (autoOpen) {
      handleStart();
    }
  }, [autoOpen]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
        setTotal(Math.round((elapsedTime / (60000 * 60)) * 30000));
      }, 1000); // Cập nhật mỗi giây
    } else if (!isRunning && startTime !== null) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    //nếu id bàn bằng với id bàn được chọn để chuyển sang
    if (String(id) === String(idSelected)) {
      console.log("=>>>>id selected ", idSelected);
      //đặt thời gian bắt đầu là thời gian bắt đầu của bàn mà khách sử dụng trước khi chuyển
      setStartTime(timePlayFromSourceTable);
    } else {
      // nếu không thì đặt thời gian bắt đầu là timestamp hiện tại
      setStartTime(Date.now()); // Lưu thời gian bắt đầu
      console.log("========================", typeof id);
      console.log("========================", typeof idSelected);
    }
    setIsRunning(true); // Bắt đầu bộ đếm
    setAvailable(true);
    setCountTimeButtonState(!countTimeButtonState);
    console.log("======>", idSelected);
  };

  const handleStop = () => {
    setIsRunning(false); // Dừng bộ đếm
  };

  function handleResetAllStatus() {
    setAvailable(false);
    handleStop();
  }

  const checkoutAndTurnOffModal = () => {
    handleResetAllStatus();
    setChangeOrCheckoutVisible(false);
  };

  const handleCheckout = (timePlay) => {
    const cash = Math.round((elapsedTime / (60000 * 60)) * 30000);
    Alert.alert("tính tiền", "tổng tiền: " + "" + cash + "đ", [
      {
        text: "Hủy",
        style: "destructive",
      },
      {
        text: "hoàn thành",
        onPress: checkoutAndTurnOffModal,
      },
    ]);
  };
  //   const handleReset = () => {
  //     setElapsedTime(0); // Đặt lại thời gian
  //     setStartTime(null); // Đặt lại thời gian bắt đầu
  //     setIsRunning(false); // Dừng bộ đếm
  //   };

  // Hàm để định dạng thời gian thành hh:mm:ss
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  function handleClickTable() {
    //setAvailable(!available);
    setOpenTableModalVisible(true);
  }

  function handleAcceptOpenTable() {
    setOpenTableModalVisible(false);
    setAvailable(!available);
    handleStart();
  }

  const handleChangOrCheckout = () => {
    setChangeOrCheckoutVisible(true);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: available ? "#5acddf" : "white" },
        { borderWidth: 1, marginRight:15, marginLeft:15,marginBottom:10 },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={available ? handleChangOrCheckout : handleClickTable}
      >
        <View>
          <Text
            style={{
              alignSelf: "center",
              marginBottom: 5,
              marginTop: 5,
              fontWeight: "500",
              fontSize: 20,
            }}
          >
            Bàn {id}
          </Text>
          <View style={{ alignItems: "center" }}>
            {available ? (
              <Ionicons name="tablet-landscape" size={75} color="black" />
            ) : (
              <Ionicons
                name="tablet-landscape-outline"
                size={75}
                color="black"
              />
            )}
          </View>

          <Text style={{ paddingLeft: 10 }}>Trạng thái: </Text>
          <Text
            style={{
              marginBottom: 5,
              paddingLeft: 10,
              fontSize: 16,
              color: "red",
              fontWeight: "bold",
            }}
          >
            {available ? "đang dùng" : "trống"}
          </Text>
          <Text style={{ alignSelf: "center" }}>
            {available ? "thời gian chơi: " + formatTime(elapsedTime) : ""}
          </Text>
        </View>
      </TouchableOpacity>
      <OpenTableModal
        visible={openTableModalVisible}
        tableName={id}
        onAcceptPress={handleAcceptOpenTable}
        onClose={() => setOpenTableModalVisible(false)}
        id={id}
        // handleChangeTable={handleChangeTableToTableSelect}
      />
      <ChangeOrCheckoutModal
        visible={changeOrCheckoutModalVisible}
        handlCheckout={handleCheckout}
        onClose={() => setChangeOrCheckoutVisible(false)}
        handleSelect={handleSelectItem}
        id={id}
        startTime={startTime}
        handleChangeTable={handleChangeTable}
        handleResetAllStatuss={handleResetAllStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 270,
    width: 190,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  countTimeButton: {
    height: 30,
    width: 70,
    backgroundColor: "#944dff",
    marginBottom: 5,
  },
});
