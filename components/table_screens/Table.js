import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChangeOrCheckoutModal from "./ChangeOrCheckoutModal";
import OpenTableModal from "./OpenTableModal";
import axios from "axios";
import { useOrder } from "../context/OrderContext";
import request from "../utils/request";
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
  orderMap
}) {
  const [checkoutStatus,setCheckoutStatus]= useState();
  const [date,setDate] = useState();
  const [endTime,setEndTime]= useState('');
  const [totalTime,setTotalTime]= useState('');
  const [startTimeReq, setStartTimeReq] = useState('');
  const {setOrderId, setTableId} = useOrder();//bien thay doi gia tri orderId
  const [available, setAvailable] = useState(false);
  const [startTime, setStartTime] = useState(null); // Lưu thời gian bắt đầu
  const [elapsedTime, setElapsedTime] = useState(0); // Thời gian đã trôi qua
  const [isRunning, setIsRunning] = useState(false); // Kiểm tra bộ đếm có đang chạy hay không
  const [countTimeButtonState, setCountTimeButtonState] = useState(false);
  const [total, setTotal] = useState(0);
  const [openTableModalVisible, setOpenTableModalVisible] = useState(false);
  const [changeOrCheckoutModalVisible, setChangeOrCheckoutVisible] = useState(false);
  const [selectedTable, setSelectedTable]= useState()
  const [isOrderId, setIsOrderId]= useState()
  const orderTableMap = new Map();

// Thêm dữ liệu với tableId là key, orderId là value
  const orderId = 123;
  const tableId = 4;



    useEffect(() => {
      console.log("Start Time Req:", startTimeReq);
    }, [startTimeReq]);
    
    useEffect(() => {
      console.log("End Time:", endTime);
    }, [endTime]);
    
    useEffect(() => {
      postStatus();
      console.log("Total Time:", totalTime);
    }, [totalTime]);
  
    useEffect(() => {
      console.log("Ngay hom nay:", date);
    }, [date]);

    // useEffect(() => {
    //   postStatus();
    //   console.log("use effect post stt");
    // },[checkoutStatus])

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


  const delay = (ms) => 
    new Promise(resov => setTimeout(resov,ms));
  

  // function convertMillisecondsToTime(ms) {
  //   let date = new Date(ms);
  
  //   let hours = date.getUTCHours() +7; // Giờ UTC
  //   let minutes = date.getUTCMinutes();
  //   let seconds = date.getUTCSeconds();

  //   let time =  `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  //   console.log("ham convert: "+time);
  //   return time;
  // }

  function convertMillisecondsToTime(ms) {
    let date = new Date(ms);
  
    // Cộng thêm 7 giờ để chuyển từ UTC sang giờ Việt Nam
    let hours = date.getUTCHours() + 7;

    // Xử lý khi số giờ vượt quá 24 hoặc âm
    if (hours >= 24) {
        hours -= 24; // Điều chỉnh để đảm bảo giờ nằm trong khoảng 0-23
    } else if (hours < 0) {
        hours += 24; // Điều chỉnh khi giờ nhỏ hơn 0
    }

    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();

    // Tạo chuỗi thời gian định dạng hh:mm:ss
    let time = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    console.log("ham convert: " + time);
    return time;
}




  function getCurrentDate() {
  let today = new Date();

  let day = today.getDate(); // Lấy ngày (1-31)
  let month = today.getMonth() + 1; // Lấy tháng (tháng trong JavaScript bắt đầu từ 0, nên cần +1)
  let year = today.getFullYear(); // Lấy năm (ví dụ: 2024)

  let date = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  // Định dạng ngày theo dạng dd/mm/yyyy
  return date;
}
    

  function convertElapsedToTime(ms) {
    let date = new Date(ms);
  
    let hours = date.getUTCHours() ; // Giờ UTC
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let time= `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    console.log(typeof time);
    return time;
  }

  const handleStart = () => {
    //nếu id bàn bằng với id bàn được chọn để chuyển sang
    if (String(id) === String(idSelected)) {
      console.log("=>>>>id selected ", idSelected);
      //đặt thời gian bắt đầu là thời gian bắt đầu của bàn mà khách sử dụng trước khi chuyển
      setStartTime(timePlayFromSourceTable);
    } else {
      // nếu không thì đặt thời gian bắt đầu là timestamp hiện tại
      setStartTime(Date.now()); // Lưu thời gian bắt đầu
      // console.log("========================", typeof id);
      // console.log("========================", typeof idSelected);
    }
    setIsRunning(true); // Bắt đầu bộ đếm
    setAvailable(true);
    setCountTimeButtonState(!countTimeButtonState);
    setDate(getCurrentDate);
    setStartTimeReq(convertMillisecondsToTime(startTime));
    console.log(startTime+" Gia tri start time");
    //console.log("======>", idSelected);
  };

  const handleStop = () => {
    setIsRunning(false); // Dừng bộ đếm

    
    setEndTime(convertMillisecondsToTime(startTime+elapsedTime));
    setTotalTime(convertElapsedToTime(elapsedTime));

  };

  function handleResetAllStatus() {
    setAvailable(false);
    handleStop();
  }

  const checkoutAndTurnOffModal = async () => {
    handleResetAllStatus();
    setChangeOrCheckoutVisible(false);
    setCheckoutStatus(Math.random());
    await delay(10000);
    //postStatus();
    
    console.log("thong tin gui len status :" + isOrderId + " table " + id + 
    " startTime" + startTimeReq + " endtime" + endTime + " totalTime" + totalTime )
    
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
  // useEffect(() => {
  //   console.log(orderId, "Order ID đã được cập nhật");
  // }, [orderId]);
  
  const postStatus = async () => {
    console.log("-------- thong tin trong map: ", isOrderId)
    try {
      const response=await request.post('/status/create',{
        orderId: isOrderId,//isOrderId,
        billiardTableId: id,
        startTime: startTimeReq,
        endTime: endTime,
        totalTime: totalTime,
        date: date

      })
      console.log("========response status: " + response.data.result)
    }catch(Error){
      console.log("loi roi thg loz.");
    } 
    //orderTableMap.delete(id);
    console.log(id);
    console.log("======= thong tin trong map", isOrderId);
  }

  const handleAcceptOpenTable = async() =>{
    // ham post len orderId
    try {
      const response=await request.post('/order_table/create',{
        orderId: parseInt(id)

      })
      console.log(response.data.result,"======");
      setOrderId(response.data.result);
      setTableId(id)
      console.log("Luu vao map: "+"TableId: "+id+ "orderId"+response.data.result)
      setIsOrderId(response.data.result)

    }catch(Error){
      console.log("===loi o accecptOpenTable");
    } 
    // orderMap.set(id,orderId);
    
    console.log("-------- mo ban so: " + id)
    setSelectedTable(id);
    setOpenTableModalVisible(false);
    setAvailable(!available);
    handleStart();
  }
  

  const handleChangOrCheckout = () => {
    
    setChangeOrCheckoutVisible(true);
  };8
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
    width: 177,
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
