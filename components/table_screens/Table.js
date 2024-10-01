import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChangeOrCheckoutModal from "./ChangeOrCheckoutModal";
import OpenTableModal from "./OpenTableModal";
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
}) {
  
  const orderIdMap = {
    0:0,
    
}

  const [date,setDate] = useState();
  const [endTime,setEndTime]= useState('');
  const [totalTime,setTotalTime]= useState('');
  const [startTimeReq, setStartTimeReq] = useState('');
  const {setOrderId, setTableId} = useOrder();//bien thay doi gia tri orderId
  const [available, setAvailable] = useState(false);
  const [startTime, setStartTime] = useState(0); // Lưu thời gian bắt đầu
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

  useEffect(() => {
    console.log("Start Time Req:", startTimeReq);
  }, [startTimeReq]);
  
  useEffect(() => {
    console.log("End Time:", endTime);
  }, [endTime]);
  
  useEffect(() => {
    console.log("Total Time:", totalTime);
  }, [totalTime]);

  useEffect(() => {
    console.log("Ngay hom nay:", date);
  }, [date]);

  function convertMillisecondsToTime(ms) {
    let date = new Date(ms);
  
    let hours = date.getUTCHours() +7; // Giờ UTC
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();

    let time =  `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    console.log(typeof time);
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
  
  // let time = convertMillisecondsToTime(1727782849746);
  // console.log(time);  // Kết quả là: "16:07:09"
  

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
    //console.log("======>", idSelected);
  };

  const handleStop = () => {
    setIsRunning(false); // Dừng bộ đếm

    setStartTimeReq(convertMillisecondsToTime(startTime));
    setEndTime(convertMillisecondsToTime(startTime+elapsedTime));
    setTotalTime(convertElapsedToTime(elapsedTime));


  //   console.log("=========>",startTimeReq);
  //   console.log("=>>>>>>>>",endTime);
   
  //  console.log(totalTime);

   
  };

  function handleResetAllStatus() {
    setAvailable(false);
    handleStop();
  }

  const checkoutAndTurnOffModal = async() => {
    handleResetAllStatus();
    setChangeOrCheckoutVisible(false);

    // try{
    //   const response=await request.post('/status/create',{
        
    //     orderId:orderIdMap[id] ,
    //     billiardTableId: id,
    //     startTime: startTimeReq,
    //     endTime: endTime,
    //     totalTime: totalTime,
    //     date: date,
        

    //   })
    //   console.log("====", startTimeReq+ " "+ endTime+ " "+ totalTime+ " "+ date)
    //   console.log(response.data.result,"======");
      
    //   console.log("map:  ",id+ "  " + orderIdMap[id]);
    //   console.log(id + ": " + orderIdMap[id]);
    //   console.log("=====================================");
    //   console.log("Dữ liệu gửi đi: ", {
    //     orderId: orderIdMap[id],
    //     billiardTableId: id,
    //     startTime: startTimeReq,
    //     endTime: endTime,
    //     totalTime: totalTime,
    //     date: date
    //   });
      
    // }catch(error){
    //   console.log(error,"===x===error===x===")

    // }
    console.log("====", startTimeReq + " " + endTime + " " + totalTime + " " + date);
    console.log(response.data.result, "======");
    
    console.log("Dữ liệu gửi đi: ", {
        orderId: orderIdMap[id],
        billiardTableId: id,
        startTime: startTimeReq,
        endTime: endTime,
        totalTime: totalTime,
        date: date
  });
  
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
  
  const handleAcceptOpenTable= async() =>{
    try{
      const response=await request.post('/order_table/create',{
        orderId: parseInt(id)

      })
      console.log(response.data.result,"======");
      setOrderId(response.data.result);
      setTableId(id)
      orderIdMap[id] = response.data.result;
      console.log("map:  ",id+ "  " + response.data.result);
      console.log(id + ": " + orderIdMap[id]);
      console.log("=======================================================");
      console.log("ID hiện tại:", id);  // Kiểm tra giá trị của id
console.log("orderIdMap hiện tại:", orderIdMap);  // Kiểm tra map
console.log("orderId từ map:", orderIdMap[id]);  // Kiểm tra giá trị lấy từ map

    }catch(error){
      console.log(error,"===x===error===x===")

    }
    
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
}
