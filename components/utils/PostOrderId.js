import axios from "axios";
import { Alert } from "react-native";

const PostOrderId = async (foodId, quantity, table, orderId) => {
  if (!quantity || parseInt(quantity) <= 0 || !table || parseInt(table) <= 0) {
    Alert.alert("Thông báo", "Vui lòng nhập số lượng và chọn bàn hợp lệ!");
    return;
  }
  
  try {
    console.log("Check value:", foodId, quantity, table, orderId);
    
    if (orderId == null) {
      Alert.alert("Thông báo", "Vui lòng đặt bàn trước");
      return;
    } else {
      const response = await axios.post(
        "https://quan-ly-bida-backend.onrender.com/OrderFoodItem/create",
        {
          foodId: foodId,
          quantity: quantity,
          tableId: table,
          orderId: orderId,
        }
      );
      
      // Kiểm tra kết quả phản hồi từ server
      const { code, msg } = response.data;
      
      if (code === 0) {
        console.log("Lỗi:", msg);
        Alert.alert("Thông báo", `Lỗi khi tạo mục đặt hàng: ${msg}`);
      } else {
        console.log("==========Success==========", response.data);
        Alert.alert("Thành công", "Mục đặt hàng đã được tạo thành công!");
      }
    }
  } catch (error) {
    Alert.alert("Thông báo", "Có lỗi xảy ra!?");
    console.error(error);
  }
};

export default PostOrderId;
