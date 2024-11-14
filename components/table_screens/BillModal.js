import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacityComponent,
  View,
} from "react-native";
import { useOrder } from "../context/OrderContext";
import axios from "axios";
import { FIRESTORE_DB } from "../Login_Function/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
export const BillModal = ({
  visible,
  startTime,
  elapsedTime,
  foodData,
  checkoutAndTurnOffModal,
  totalCash,
  foodCost
}) => {
  const { orderId, tableId } = useOrder();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [bankID, setBankID] = useState();

  const handleCheckout = () => {
    checkoutAndTurnOffModal();
    setLoading(true);
  };

  useEffect(() => {
    const fetchBankAccountDetails = async () => {
      try {
        const bankAccountCollectionRef = collection(
          FIRESTORE_DB,
          "bankAccounts"
        );
        const querySnapshot = await getDocs(bankAccountCollectionRef);
        if (!querySnapshot.empty) {
          const accountData = querySnapshot.docs[0].data();
          setName(accountData.accountName);
          setAccNumber(accountData.accountNo);
          setBankID(accountData.acqId);
        }
      } catch (error) {
        console.error("Error fetching bank account details:", error);
      }
    };

    fetchBankAccountDetails();
    // fetchBankAccountDetails() is called at the end of useEffect because useEffect itself cannot be async.
  }, []);
  //tạo button thanh toán bằng QR rồi thêm xử lý onPress là hàm dưới
  const handleQR = () => {
    checkoutAndTurnOffModal;
    const requestBody = {
      accountNo: accNumber,
      accountName: name,
      acqId: bankID,
      amount: totalCash, // Assuming an amount; you can adjust it as needed
      addInfo: "Thanh toan Billiard club",
      format: "text",
      template: "compact",
    };

    axios
      .post("https://api.vietqr.io/v2/generate", requestBody)
      .then((response) => {
        setImageUrl(response.data.data.qrDataURL);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
        setLoading(false);
      });
      console.log("===> body QR request:",requestBody)
  };

  function convertMillisecondsToTime(ms) {
    let date = new Date(ms);
    let hours = date.getUTCHours() + 7;
    if (hours >= 24) hours -= 24;
    else if (hours < 0) hours += 24;
    let minutes = date.getUTCMinutes();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  };

  function convertElapsedToTime(ms) {
    let date = new Date(ms);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  }

  const renderFoodItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>
        {index + 1}. {item.food.name}
      </Text>
      <Text style={styles.cell}>{item.food.cost.toLocaleString()} đ</Text>
      <Text style={styles.cell}>{item.quantity}</Text>
      <Text style={styles.cell}>
        {(item.food.cost * item.quantity).toLocaleString()} đ
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.billContainer}>
          <Text style={styles.title}>Hoá đơn</Text>
          <View style={styles.row}>
            <Text style={{ fontWeight: "bold" }}>Bàn {tableId}</Text>
            <Text>Mã: HD{orderId}</Text>
          </View>
          <Text style={{ marginBottom: 2 }}>
            Thời gian bắt đầu: {convertMillisecondsToTime(startTime)}
          </Text>
          <Text style={{ marginBottom: 2 }}>
            Thời gian kết thúc:{" "}
            {convertMillisecondsToTime(startTime + elapsedTime)}
          </Text>
          <Text >
            Tổng thời gian chơi: {convertElapsedToTime(elapsedTime)}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Tiền Bàn: {formatCurrency(totalCash - foodCost )}
          </Text>

          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Món ăn</Text>
            <Text style={styles.headerCell}>Giá</Text>
            <Text style={styles.headerCell}>Số lượng</Text>
            <Text style={styles.headerCell}>Thành tiền</Text>
          </View>

          <FlatList
            data={foodData}
            renderItem={renderFoodItem}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Tổng tiền món ăn:</Text>
            <Text style={styles.totalAmount}>
              {foodData
                .reduce(
                  (total, item) => total + item.food.cost * item.quantity,
                  0
                )
                .toLocaleString()}{""}
              đ
            </Text>
          </View>

          <View style={styles.total}>
            <Text style={styles.totalAmountLabel}>
              Tổng thanh toán: {formatCurrency(totalCash)} 
            </Text>
          </View>

          <Text style={styles.footer}>Xin cam on quy khach!</Text>

          <View style={styles.buttonContainer}>
            <View style={{width:80, flexDirection:'row'}}>
            <Button onPress={handleQR} title="Mã QR code" />
            <View style={{width:'220%'}}></View>
              <Button title="Hoàn thành" onPress={handleCheckout} />
              </View>
            
          </View>
        </View>
        
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1, marginBottom:10 }}
        >
          {loading ? null : (
            <Image
              source={{ uri: imageUrl }}
              style={{ width: 380, height: 360, borderRadius:30 }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  billContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  total: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    marginRight: 43,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  totalLabel: {
    fontWeight: "bold",
    flex: 3,
    textAlign: "right",
    paddingRight: 10,
  },
  totalAmount: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  totalAmountLabel: {
    fontWeight: "bold",
    flex: 3,
    textAlign: "right",
    paddingRight: 10,
    fontSize: 16,
  },
  totalAmountValue: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 15,
  },
});
